"use client";
import { useContact } from "@/hooks/useApi";
import { Section } from "@/components/shared";
import * as yup from "yup";
import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Phone, Email, User, ChatLine, Location, ArrowLeft } from "@/public/svg";
import map from "@/public/images/_Google maps mockup.png";
import Image from "next/image";
import { useState } from "react";

const schema = yup.object().shape({
  phone_number: yup.string().required("رقم الهاتف مطلوب").min(10, "رقم الهاتف يجب أن يكون 10 أرقام على الأقل"),
  email: yup.string().email("البريد الإلكتروني غير صحيح").required("البريد الإلكتروني مطلوب"),
  message: yup.string().required("الرسالة مطلوبة").min(10, "الرسالة يجب أن تكون 10 أحرف على الأقل"),
  full_name: yup.string().required("الاسم مطلوب").min(3, "الاسم يجب أن يكون 3 أحرف على الأقل"),
});

export type SchemaType = yup.InferType<typeof schema>;

// مكون Input بسيط
function CustomInput({ name, icon, placeholder, area, isHome }: {
  name: "phone_number" | "email" | "message" | "full_name";
  icon: any;
  placeholder: string;
  area?: boolean;
  isHome?: boolean;
}) {
  const { register, formState } = useForm<SchemaType>();
  
  if (!area) {
    return (
      <div className="relative flex flex-col gap-2">
        <label htmlFor={name} className="absolute top-[45%] translate-y-[-50%] right-[24px] z-10">
          {icon}
        </label>
        <input
          id={name}
          {...register(name)}
          className={`${isHome ? "bg-background" : "bg-white"} border border-border p-[24px] w-full rounded-[15px] pr-[64px] placeholder:text-dark-gray caret-second-primary-color focus:outline-none focus:border-second-primary-color`}
          type={name === "email" ? "email" : "text"}
          placeholder={placeholder}
        />
        {formState.errors[name]?.message && (
          <span className="text-red-500 text-sm">{formState.errors[name]?.message}</span>
        )}
      </div>
    );
  } else {
    return (
      <div className="relative flex flex-col gap-2">
        <label htmlFor={name} className="absolute top-[22px] right-[23px] z-10">
          {icon}
        </label>
        <textarea
          id={name}
          {...register(name)}
          className={`${isHome ? "bg-background" : "bg-white"} border border-border p-[24px] w-full h-[295px] rounded-[15px] pr-[64px] placeholder:text-dark-gray caret-second-primary-color focus:outline-none focus:border-second-primary-color resize-none`}
          placeholder={placeholder}
        />
        {formState.errors[name]?.message && (
          <span className="text-red-500 text-sm">{formState.errors[name]?.message}</span>
        )}
      </div>
    );
  }
}

export default function ContactUs({ isHome }: { isHome?: boolean }) {
  const contacts = [
    {
      icon: <Phone className="size-[42px]" />,
      title: "الهاتف",
      description: "+966 55 555 5555",
    },
    {
      icon: <Email className="size-[42px]" />,
      title: "عنوان البريدي",
      description: "support@Dieux.com",
    },
    {
      icon: <Location className="size-[42px]" />,
      title: "الوكيشن",
      description: " The Greek Campus - Dieux",
    },
  ];
  
  const [submitStatus, setSubmitStatus] = useState(null);
  const contactMutation = useContact();
  
  const form = useForm<SchemaType>({
    defaultValues: {
      phone_number: "",
      email: "",
      message: "",
      full_name: "",
    },
    resolver: yupResolver(schema),
  });
  
  const handelSubmit: SubmitHandler<SchemaType> = async (value, event) => {
    event?.preventDefault();
    
    try {
      setSubmitStatus('loading');
      await contactMutation.mutateAsync(value);
      setSubmitStatus('success');
      form.reset();
      
      // إخفاء رسالة النجاح بعد 5 ثوان
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      setSubmitStatus('error');
      console.error('Contact form error:', error);
      
      // إخفاء رسالة الخطأ بعد 5 ثوان
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };
  
  return (
    <Section
      isWhite={isHome ? true : false}
      hasTitle
      subTitle="لوريم إيبسوم(Lorem Ipsum) هو ببساطة نص شكلي (بمعنى أن الغاية هي الشكل وليس المحتوى)"
      title="تواصل معنا عبر البريد"
    >
      {isHome && (
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handelSubmit)} className="grid grid-cols-1 gap-[19px]">
            {submitStatus === 'success' && (
              <div className="p-4 bg-green-100 border border-green-300 rounded-[10px] text-green-700">
                تم إرسال رسالتك بنجاح. سنتواصل معك قريباً!
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="p-4 bg-red-100 border border-red-300 rounded-[10px] text-red-700">
                حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.
              </div>
            )}
            
            <div className="grid md:grid-cols-2 gap-[15px]">
              <CustomInput isHome name="full_name" placeholder="اسمك بالكامل" icon={<User />} />
              <CustomInput isHome name="phone_number" placeholder="رقم الهاتف" icon={<Phone className="size-[35px]" />} />
            </div>
            <CustomInput isHome name="email" placeholder="الاميل الخاص بك" icon={<Email className="size-[30px]" />} />
            <CustomInput
              isHome
              name="message"
              area
              placeholder="اكتب رسالتك هنا"
              icon={<ChatLine className="size-[35px]" />}
            />
            <div className="flex gap-[20px]">
              <button
                type="submit"
                disabled={contactMutation.isPending || submitStatus === 'loading'}
                className="max-w-[280px] px-[64px] py-[10px] text-white bg-second-primary-color rounded-[10px] text-[19.019px] hover:bg-second-primary-color/90 cursor-pointer transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {contactMutation.isPending || submitStatus === 'loading' ? 'جاري الإرسال...' : 'تواصل معنا'}
              </button>
              <button
                type="reset"
                onClick={() => form.reset({ email: "", full_name: "", message: "", phone_number: "" })}
                className="max-w-[184px] px-[64px] py-[10px] bg-white text-[19.019px] rounded-[10px] cursor-pointer hover:text-dark-gray transition-all duration-300"
              >
                الغاء
              </button>
            </div>
          </form>
        </FormProvider>
      )}
      {!isHome && (
        <div className="flex flex-col gap-[50px]">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-[30px]">
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(handelSubmit)} className="grid grid-cols-1 gap-[19px]">
                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-100 border border-green-300 rounded-[10px] text-green-700">
                    تم إرسال رسالتك بنجاح. سنتواصل معك قريباً!
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-100 border border-red-300 rounded-[10px] text-red-700">
                    حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.
                  </div>
                )}
                
                <div className="grid md:grid-cols-2 gap-[15px]">
                  <CustomInput name="full_name" placeholder="اسمك بالكامل" icon={<User className="size-[35px]" />} />
                  <CustomInput name="phone_number" placeholder="رقم الهاتف" icon={<Phone className="size-[35px]" />} />
                </div>
                <CustomInput name="email" placeholder="الاميل الخاص بك" icon={<Email className="size-[30px]" />} />
                <CustomInput
                  name="message"
                  area
                  placeholder="اكتب رسالتك هنا"
                  icon={<ChatLine className="size-[35px]" />}
                />
                <div className="flex gap-[20px]">
                  <button
                    type="submit"
                    disabled={contactMutation.isPending || submitStatus === 'loading'}
                    className="max-w-[280px] px-[64px] py-[10px] text-white bg-second-primary-color rounded-[10px] text-[19.019px] hover:bg-second-primary-color/90 cursor-pointer transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {contactMutation.isPending || submitStatus === 'loading' ? 'جاري الإرسال...' : 'تواصل معنا'}
                  </button>
                  <button
                    type="reset"
                    onClick={() => form.reset({ email: "", full_name: "", message: "", phone_number: "" })}
                    className="max-w-[184px] px-[64px] py-[10px] bg-white text-[19.019px] rounded-[10px] cursor-pointer hover:text-dark-gray transition-all duration-300"
                  >
                    الغاء
                  </button>
                </div>
              </form>
            </FormProvider>
            <div className="grid gap-[20px]">
              <div className="grid lg:grid-cols-3 gap-[17px]">
                {contacts.map(({ icon, description, title }, index) => (
                  <div
                    key={index}
                    className="flex flex-col justify-center items-center py-[30px] bg-white rounded-[15px] gap-[15px]"
                  >
                    <div className="bg-gradient-to-br from-[#f2f3f8] w-fit via-white to-white p-[24px] rounded-[15px] border border-border flex justify-center items-center">
                      {icon}
                    </div>
                    <h5 className="text-[20px] leading-[32px] text-second-primary-color text-center">{title}</h5>
                    <p className="text-base text-dark-gray leading-[24px]">{description}</p>
                  </div>
                ))}
              </div>
              <Image src={map} alt="map" width={1280} height={960} className="rounded-[15px]" />
            </div>
          </div>
          <div>
            <div className="flex flex-col items-center text-center gap-[20px]">
              <h2 className="text48 text-center leading-[130%] tracking-[-1.44px]">فروعنا</h2>
              <h3 className="text20 text-center leading-[147%] tracking-[-0.6px] text-dark-gray max-w-[33%]">
                لوريم إيبسوم(Lorem Ipsum) هو ببساطة نص شكلي (بمعنى أن الغاية هي الشكل وليس المحتوى)
              </h3>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-[17px] gap-y-[20px] mt-[50px]">
              {Array.from({ length: 6 }).map((_, index) => {
                return (
                  <div key={index} className="bg-white flex items-center gap-[15px] p-[30px] rounded-[15px] border border-border-primary hover:scale-95 transition-all cursor-pointer duration-300">
                    <div className="flex items-center justify-center p-6 size-[96px] rounded-[15px] border border-border-primary">
                      <Location className="size-[42px]" />
                    </div>
                    <div className="flex-1 flex flex-col gap-[15px]">
                      <h3 className="text20 leading-8 text-text-dark">الوكيشن التاني علي الخريطه</h3>
                      <p className="text16 leading-6 text-description">فرع مدينة نصر: الحي العاشر، مدينة نصر، القاهرة، مصر.</p>
                    </div>
                    <ArrowLeft/>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}