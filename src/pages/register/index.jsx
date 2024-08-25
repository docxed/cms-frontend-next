import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Head from 'next/head'
import Link from 'next/link'
import useRegisterAPI from '@/api/register/register.api.js'
import notifyStore from '@/stores/notify.store'

const validationSchema = z
  .object({
    email: z
      .string()
      .min(1, {
        message: 'กรุณากรอกอีเมล',
      })
      .email({
        message: 'รูปแบบอีเมลไม่ถูกต้อง',
      })
      .max(100, {
        message: 'อีเมลต้องมีความยาวไม่เกิน 100 ตัวอักษร',
      }),
    firstname: z
      .string()
      .min(1, {
        message: 'กรุณากรอกชื่อ',
      })
      .max(100, {
        message: 'ชื่อต้องมีความยาวไม่เกิน 100 ตัวอักษร',
      }),
    lastname: z
      .string()
      .min(1, {
        message: 'กรุณากรอกนามสกุล',
      })
      .max(100, {
        message: 'นามสกุลต้องมีความยาวไม่เกิน 100 ตัวอักษร',
      }),
    password: z
      .string()
      .min(6, {
        message: 'กรุณากรอกรหัสผ่านอย่างน้อย 6 ตัวอักษร',
      })
      .max(20, {
        message: 'รหัสผ่านต้องมีความยาวไม่เกิน 20 ตัวอักษร',
      }),
    confirmPassword: z.string().min(1, {
      message: 'กรุณายืนยันรหัสผ่าน',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'รหัสผ่านไม่ตรงกัน',
    path: ['confirmPassword'],
  })

export default function RegisterPage() {
  const registerAPI = useRegisterAPI()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
    mode: 'onBlur',
  })
  const successNoti = notifyStore((state) => state.success)

  const onSubmit = async (data) => {
    await registerAPI.register({
      email: data.email,
      firstname: data.firstname,
      lastname: data.lastname,
      password: data.password,
      confirm_password: data.confirmPassword,
    })
    successNoti('สมัครสมาชิกสำเร็จ')
  }

  return (
    <>
      <Head>
        <title>สมัครสมาชิก</title>
      </Head>
      <section className="tw-flex tw-flex-col tw-flex-wrap tw-h-screen tw-p-2">
        <div className="tw-m-auto tw-w-full">
          <Card className="tw-m-auto tw-max-w-[900px]" title="สมัครสมาชิก">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="tw-flex tw-flex-col tw-flex-wrap tw-space-y-2"
            >
              <div className="tw-flex tw-flex-col tw-gap-2">
                <label htmlFor="email">อีเมล</label>
                <IconField iconPosition="left">
                  <InputIcon className="pi pi-envelope" />
                  <InputText
                    id="email"
                    placeholder="อีเมล"
                    {...register('email')}
                    invalid={errors.email}
                    className="tw-w-full"
                  />
                </IconField>
                {errors.email && (
                  <small className="p-error">{errors.email.message}</small>
                )}
              </div>

              <section className="tw-grid tw-grid-cols-2 tw-gap-2">
                <div className="tw-flex tw-flex-col tw-gap-2">
                  <label htmlFor="firstname">ชื่อ</label>
                  <InputText
                    id="firstname"
                    placeholder="ชื่อ"
                    {...register('firstname')}
                    invalid={errors.firstname}
                    className="tw-w-full"
                  />
                  {errors.firstname && (
                    <small className="p-error">
                      {errors.firstname.message}
                    </small>
                  )}
                </div>
                <div className="tw-flex tw-flex-col tw-gap-2">
                  <label htmlFor="lastname">นามสกุล</label>
                  <InputText
                    id="lastname"
                    placeholder="นามสกุล"
                    {...register('lastname')}
                    invalid={errors.lastname}
                    className="tw-w-full"
                  />
                  {errors.lastname && (
                    <small className="p-error">{errors.lastname.message}</small>
                  )}
                </div>
              </section>
              <div className="tw-flex tw-flex-col tw-gap-2">
                <label htmlFor="password">รหัสผ่าน</label>
                <IconField iconPosition="left">
                  <InputIcon className="pi pi-key" />
                  <InputText
                    type="password"
                    id="password"
                    placeholder="รหัสผ่าน"
                    {...register('password')}
                    invalid={errors.password}
                    className="tw-w-full"
                  />
                </IconField>
                {errors.password && (
                  <small className="p-error">{errors.password.message}</small>
                )}
              </div>
              <div className="tw-flex tw-flex-col tw-gap-2">
                <label htmlFor="confirmPassword">ยืนยันรหัสผ่าน</label>
                <IconField iconPosition="left">
                  <InputIcon className="pi pi-key" />
                  <InputText
                    type="password"
                    id="confirmPassword"
                    placeholder="ยืนยันรหัสผ่าน"
                    {...register('confirmPassword')}
                    invalid={errors.confirmPassword}
                    className="tw-w-full"
                  />
                </IconField>
                {errors.confirmPassword && (
                  <small className="p-error">
                    {errors.confirmPassword.message}
                  </small>
                )}
              </div>
              <div className="tw-flex tw-flex-row tw-flex-wrap tw-space-x-2">
                <Button type="submit">สมัครสมาชิก</Button>
                <Link href="/login">
                  <Button link>ล็อกอิน</Button>
                </Link>
              </div>
            </form>
          </Card>
        </div>
      </section>
    </>
  )
}
