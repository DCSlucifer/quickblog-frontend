import React from 'react';
import { assets, footer_data } from '../assets/assets';
import toast from 'react-hot-toast';

const Footer = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/3">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
        <div>
          <img src={assets.logo} alt="logo" className="w-16 sm:w-22" />
          <p className="max-w-[410px] mt-6">
            Every great story starts with a single step — a small idea that
            grows into something remarkable. In today’s fast-changing digital
            world, creativity and consistency are the keys that separate
            dreamers from doers. Whether you’re building a business, writing a
            blog, or creating something entirely new, what truly matters is the
            courage to begin.
          </p>
        </div>

        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
          {footer_data.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">
                {section.title}
              </h3>
              <ul className="text-sm space-y-1">
                {section.links.map((link, i) => {
                  // Define link destinations
                  let href = '#';
                  let onClick = null;

                  if (section.title === 'Quick Links') {
                    if (link === 'Home') href = '/';
                    else if (link === 'All Blogs') href = '/';
                    else if (link === 'About') href = '#';
                    else if (link === 'Contact') {
                        href = '#';
                        onClick = (e) => {
                            e.preventDefault();
                            toast((t) => (
                                <span>
                                  <b>Contact Info:</b><br/>
                                  📞 0393643864<br/>
                                  📧 vothanhdanh8208@gmail.com
                                </span>
                              ), {
                                duration: 5000,
                                icon: 'ℹ️',
                              });
                        }
                    }
                  } else if (section.title === 'Categories') {
                    href = `/#${link.toLowerCase()}`; // Scroll to category
                  } else if (section.title === 'Follow Us') {
                    // Social media links
                    if (link === 'Facebook') href = 'https://www.facebook.com/Danhlucifer2304';
                    else if (link === 'Instagram') href = 'https://www.instagram.com/t.danh_vo/';
                    else if (link === 'Twitter') href = 'https://x.com/DanhVThnh76295';
                  }

                  const isExternal = section.title === 'Follow Us';

                  return (
                    <li key={i}>
                      <a
                        href={href}
                        onClick={onClick}
                        className="hover:underline transition hover:text-primary"
                        target={isExternal ? '_blank' : '_self'}
                        rel={isExternal ? 'noopener noreferrer' : undefined}
                      >
                        {link}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <p className="py-4 text-center text-sm md:text-base text-gray-500/80">
        © 2025 ThanhDanh | Crafted with passion. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
