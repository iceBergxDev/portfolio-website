import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { name, email, message } = body

  if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
    return NextResponse.json({ error: 'Invalid fields' }, { status: 400 })
  }
  if (!name.trim() || !email.trim() || !message.trim()) {
    return NextResponse.json({ error: 'All fields required' }, { status: 400 })
  }

  const { error } = await resend.emails.send({
    from: 'Portfolio <onboarding@resend.dev>',
    to: 'pirun.ks@gmail.com',
    subject: `Portfolio enquiry from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  })

  if (error) {
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
  return NextResponse.json({ success: true })
}
