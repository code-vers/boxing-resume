'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';

/**
 * @component ContactForm
 * @description The left column of the Contact page containing the "SEND A MESSAGE" form.
 * Features fields for name, email, subject, and message.
 */
export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // TODO: Integrate with backend API
  };

  return (
    <div className='bg-surface-white border-divider flex w-full flex-col gap-5 rounded-lg border p-6 sm:p-8 md:p-[25px] lg:max-w-[587px]'>
      {/* 
       * @block Heading 
       */}
      <div className='border-divider border-b pb-4'>
        <h2 className='font-bebas text-xl uppercase text-text-primary'>Send a Message</h2>
      </div>

      {/* 
       * @block Form 
       */}
      <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
        {/* Full Name */}
        <div className='flex flex-col gap-1.5'>
          <label className='text-text-placeholder text-[11px] font-normal uppercase tracking-[0.06em]'>
            Full Name
          </label>
          <Input
            placeholder='Your name'
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className='h-[41.5px] border-[#d4cec4] text-[13px] focus-visible:ring-text-accent/20'
          />
        </div>

        {/* Email Address */}
        <div className='flex flex-col gap-1.5'>
          <label className='text-text-placeholder text-[11px] font-normal uppercase tracking-[0.06em]'>
            Email Address
          </label>
          <Input
            type='email'
            placeholder='your@email.com'
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className='h-[41.5px] border-[#d4cec4] text-[13px] focus-visible:ring-text-accent/20'
          />
        </div>

        {/* Subject */}
        <div className='flex flex-col gap-1.5'>
          <label className='text-text-placeholder text-[11px] font-normal uppercase tracking-[0.06em]'>
            Subject
          </label>
          <Select
            value={formData.subject}
            onValueChange={(value) => setFormData({ ...formData, subject: value })}
          >
            <SelectTrigger className='h-[41.5px] w-full border-[#d4cec4] text-[13px] data-[placeholder]:text-text-placeholder/50'>
              <SelectValue placeholder='Select a subject' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='general'>General Inquiry</SelectItem>
              <SelectItem value='error'>Report an Error</SelectItem>
              <SelectItem value='partnership'>Partnership</SelectItem>
              <SelectItem value='media'>Media Request</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Message */}
        <div className='flex flex-col gap-1.5'>
          <label className='text-text-placeholder text-[11px] font-normal uppercase tracking-[0.06em]'>
            Message
          </label>
          <textarea
            rows={5}
            placeholder='Describe your inquiry...'
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className='border-divider bg-surface-white w-full rounded-md border p-3 text-[13px] transition-colors outline-none focus:border-text-accent/50 focus:ring-2 focus:ring-text-accent/10 placeholder:text-text-placeholder/50 h-[119.5px] resize-none'
          />
        </div>

        {/* Submit Button */}
        <div className='flex flex-col gap-4'>
          <Button
            type='submit'
            className='bg-btn-primary hover:bg-btn-primary-hover h-[39.5px] w-full text-[13px] font-medium text-surface-white'
          >
            Send Message
          </Button>
          <p className='text-text-placeholder text-center text-[11px] font-normal'>
            We typically respond within 24–48 hours.
          </p>
        </div>
      </form>
    </div>
  );
}
