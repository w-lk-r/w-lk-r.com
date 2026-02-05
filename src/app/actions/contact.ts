'use server';

import { supabase } from '@/lib/supabase';

type ContactFormState = {
  success: boolean;
  error?: string;
};

type TurnstileVerifyResponse = {
  success: boolean;
  'error-codes'?: string[];
};

async function verifyTurnstileToken(token: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    console.error('TURNSTILE_SECRET_KEY is not configured');
    return false;
  }

  const response = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    }
  );

  const data: TurnstileVerifyResponse = await response.json();
  return data.success;
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Check honeypot field - if filled, it's likely a bot
  const honeypot = formData.get('website') as string;
  if (honeypot) {
    // Silently reject but return success to not tip off bots
    return { success: true };
  }

  // Verify Turnstile token
  const turnstileToken = formData.get('cf-turnstile-response') as string;
  if (!turnstileToken) {
    return { success: false, error: 'Please complete the verification' };
  }

  const isValidToken = await verifyTurnstileToken(turnstileToken);
  if (!isValidToken) {
    return { success: false, error: 'Verification failed. Please try again.' };
  }

  // Extract form data
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  // Basic validation
  if (!name || !email || !message) {
    return { success: false, error: 'Please fill in all fields' };
  }

  if (!email.includes('@')) {
    return { success: false, error: 'Please enter a valid email address' };
  }

  // Insert into Supabase
  const { error } = await supabase.from('contact_messages').insert({
    name,
    email,
    message,
  });

  if (error) {
    console.error('Supabase error:', error);
    return { success: false, error: 'Failed to send message. Please try again.' };
  }

  return { success: true };
}
