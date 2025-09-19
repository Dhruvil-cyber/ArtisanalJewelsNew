import { MailService } from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY environment variable must be set");
}

const mailService = new MailService();
mailService.setApiKey(process.env.SENDGRID_API_KEY!);

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  try {
    await mailService.send({
      to: params.to,
      from: params.from,
      subject: params.subject,
      text: params.text,
      html: params.html,
    });
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}

// Send welcome email to new subscribers
export async function sendWelcomeEmail(email: string, firstName?: string): Promise<boolean> {
  const name = firstName || 'Valued Customer';
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Artisanal Jewels Newsletter</title>
      <style>
        body {
          font-family: 'Georgia', serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #fafafa;
        }
        .header {
          text-align: center;
          background-color: #8B7355;
          color: white;
          padding: 30px 20px;
          border-radius: 8px 8px 0 0;
        }
        .content {
          background-color: white;
          padding: 30px;
          border-radius: 0 0 8px 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .subtitle {
          font-size: 16px;
          opacity: 0.9;
        }
        .button {
          display: inline-block;
          background-color: #8B7355;
          color: white;
          text-decoration: none;
          padding: 12px 24px;
          border-radius: 4px;
          margin: 20px 0;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding: 20px;
          color: #666;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">💎 Artisanal Jewels</div>
        <div class="subtitle">Welcome to our exclusive newsletter</div>
      </div>
      
      <div class="content">
        <h2>Welcome, ${name}!</h2>
        <p>Thank you for subscribing to our newsletter. You're now part of our exclusive community and will be the first to know about:</p>
        
        <ul>
          <li>✨ New jewelry collections and limited editions</li>
          <li>🎉 Special promotions and member-only discounts</li>
          <li>💎 Behind-the-scenes craftsmanship stories</li>
          <li>📚 Jewelry care tips and styling guides</li>
        </ul>
        
        <p>As a welcome gift, enjoy browsing our latest featured pieces:</p>
        <a href="${process.env.REPLIT_DOMAINS ? `https://${process.env.REPLIT_DOMAINS.split(',')[0]}` : 'http://localhost:5000'}/catalog" class="button">Explore Our Collection</a>
        
        <p>We're thrilled to have you with us on this journey of elegance and craftsmanship.</p>
        
        <p>Warm regards,<br>
        The Artisanal Jewels Team</p>
      </div>
      
      <div class="footer">
        <p>If you no longer wish to receive these emails, you can <a href="{{unsubscribe}}">unsubscribe here</a>.</p>
        <p>© 2024 Artisanal Jewels. All rights reserved.</p>
      </div>
    </body>
    </html>
  `;

  const text = `Welcome, ${name}!

Thank you for subscribing to our newsletter. You're now part of our exclusive community and will be the first to know about:

- New jewelry collections and limited editions
- Special promotions and member-only discounts  
- Behind-the-scenes craftsmanship stories
- Jewelry care tips and styling guides

As a welcome gift, visit our catalog to explore our latest featured pieces.

We're thrilled to have you with us on this journey of elegance and craftsmanship.

Warm regards,
The Artisanal Jewels Team`;

  return sendEmail({
    to: email,
    from: 'dhruvilsavani123@gmail.com',
    subject: 'Welcome to Artisanal Jewels Newsletter! ✨',
    text,
    html
  });
}

// Send newsletter update to subscribers
export async function sendNewsletterUpdate(
  email: string, 
  firstName: string | null,
  subject: string,
  content: {
    title: string;
    message: string;
    products?: Array<{
      id: number;
      title: string;
      basePrice: string;
      images: any[];
      handle: string;
    }>;
    promotions?: Array<{
      title: string;
      description: string;
    }>;
  }
): Promise<boolean> {
  const name = firstName || 'Valued Customer';
  const baseUrl = process.env.REPLIT_DOMAINS ? `https://${process.env.REPLIT_DOMAINS.split(',')[0]}` : 'http://localhost:5000';
  
  let productsHtml = '';
  if (content.products && content.products.length > 0) {
    productsHtml = `
      <h3>Latest Products</h3>
      <div style="display: grid; gap: 20px;">
        ${content.products.map(product => {
          const imageUrl = product.images && product.images.length > 0 ? product.images[0].url : '';
          return `
            <div style="border: 1px solid #ddd; border-radius: 8px; padding: 15px; background: white;">
              ${imageUrl ? `<img src="${imageUrl}" alt="${product.title}" style="width: 100%; max-width: 200px; height: auto; border-radius: 4px;">` : ''}
              <h4 style="margin: 10px 0;">${product.title}</h4>
              <p style="font-size: 18px; color: #8B7355; font-weight: bold;">$${product.basePrice}</p>
              <a href="${baseUrl}/product/${product.handle}" style="display: inline-block; background-color: #8B7355; color: white; text-decoration: none; padding: 10px 20px; border-radius: 4px;">View Product</a>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  let promotionsHtml = '';
  if (content.promotions && content.promotions.length > 0) {
    promotionsHtml = `
      <h3>Special Offers</h3>
      ${content.promotions.map(promo => `
        <div style="background: #f8f8f8; padding: 20px; border-radius: 8px; margin: 15px 0;">
          <h4>${promo.title}</h4>
          <p>${promo.description}</p>
        </div>
      `).join('')}
    `;
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
      <style>
        body {
          font-family: 'Georgia', serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #fafafa;
        }
        .header {
          text-align: center;
          background-color: #8B7355;
          color: white;
          padding: 30px 20px;
          border-radius: 8px 8px 0 0;
        }
        .content {
          background-color: white;
          padding: 30px;
          border-radius: 0 0 8px 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .button {
          display: inline-block;
          background-color: #8B7355;
          color: white;
          text-decoration: none;
          padding: 12px 24px;
          border-radius: 4px;
          margin: 10px 0;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding: 20px;
          color: #666;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">💎 Artisanal Jewels</div>
        <div class="subtitle">${content.title}</div>
      </div>
      
      <div class="content">
        <h2>Hello, ${name}!</h2>
        <p>${content.message}</p>
        
        ${productsHtml}
        ${promotionsHtml}
        
        <p>Visit our store to explore our complete collection:</p>
        <a href="${baseUrl}/catalog" class="button">Browse All Products</a>
        
        <p>Thank you for being part of our community!</p>
        
        <p>Best regards,<br>
        The Artisanal Jewels Team</p>
      </div>
      
      <div class="footer">
        <p>If you no longer wish to receive these emails, you can <a href="{{unsubscribe}}">unsubscribe here</a>.</p>
        <p>© 2024 Artisanal Jewels. All rights reserved.</p>
      </div>
    </body>
    </html>
  `;

  const text = `${content.title}

Hello, ${name}!

${content.message}

${content.products ? content.products.map(p => `${p.title} - $${p.basePrice}\nView: ${baseUrl}/product/${p.handle}`).join('\n\n') : ''}

${content.promotions ? content.promotions.map(p => `${p.title}: ${p.description}`).join('\n\n') : ''}

Visit our store: ${baseUrl}/catalog

Thank you for being part of our community!

Best regards,
The Artisanal Jewels Team`;

  return sendEmail({
    to: email,
    from: 'dhruvilsavani123@gmail.com',
    subject,
    text,
    html
  });
}