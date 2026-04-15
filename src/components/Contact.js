'use client'
import React from 'react'
import { useLang } from '../components/Langcontext'
import '../styles/Contact.css'

const translations = {
  EN: {
    title: 'Contact Us',
    subtitle: 'We are here to help you find the right equipment',
    phone: 'Phone',
    location: 'Location',
    hours: 'Working Hours',
    hoursVal: 'Mon – Sat: 10:00 – 19:00',
    callBtn: 'Call Now',
  },
  KA: {
    title: 'დაგვიკავშირდით',
    subtitle: 'მზად ვართ დაგეხმაროთ სწორი აღჭურვილობის არჩევაში',
    phone: 'ტელეფონი',
    location: 'მდებარეობა',
    hours: 'სამუშაო საათები',
    hoursVal: 'ორშ – შაბ: 10:00 – 19:00',
    callBtn: 'დარეკვა',
  },
  RU: {
    title: 'Свяжитесь с нами',
    subtitle: 'Мы готовы помочь вам выбрать подходящее оборудование',
    phone: 'Телефон',
    location: 'Адрес',
    hours: 'Часы работы',
    hoursVal: 'Пн – Сб: 10:00 – 19:00',
    callBtn: 'Позвонить',
  },
}

function Contact() {
  const { activeLang } = useLang()
  const t = translations[activeLang]

  return (
    <div className="contact-container">
      <div className="contact-hero">
        <h1 className="contact-title">{t.title}</h1>
        <p className="contact-subtitle">{t.subtitle}</p>
      </div>

      <div className="contact-body">
        <div className="contact-info">

          <div className="contact-card">
            <div className="contact-card-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.22 1.18 2 2 0 012.22 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/>
              </svg>
            </div>
            <div className="contact-card-body">
              <span className="contact-card-label">{t.phone}</span>
              <a href="tel:+995500100470" className="contact-card-value">+995 500 100 470</a>
            </div>
            <a href="tel:+995500100470" className="contact-call-btn">{t.callBtn}</a>
          </div>

          <div className="contact-card">
            <div className="contact-card-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="10" r="3"/>
                <path d="M12 2a8 8 0 00-8 8c0 5.25 8 14 8 14s8-8.75 8-14a8 8 0 00-8-8z"/>
              </svg>
            </div>
            <div className="contact-card-body">
              <span className="contact-card-label">{t.location}</span>
              <span className="contact-card-value">Tbilisi, Georgia</span>
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-card-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <div className="contact-card-body">
              <span className="contact-card-label">{t.hours}</span>
              <span className="contact-card-value">{t.hoursVal}</span>
            </div>
          </div>

        </div>

        <div className="contact-map">
        <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2978.139!2d44.780573!3d41.741977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4044730033e99cf5%3A0x12da21eb5a4ea81c!2sTarinoks!5e0!3m2!1sen!2sge!4v1713000000000!5m2!1sen!2sge"
  width="100%"
  height="100%"
  style={{ border: 0 }}
  allowFullScreen=""
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  title="Tarinoks Location"
/>
        </div>
      </div>
    </div>
  )
}

export default Contact