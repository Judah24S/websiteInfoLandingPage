# Contact Form Setup Instructions

## Keep Your Beautiful Design + Google Forms Backend!

### Step 1: Create the Google Form

1. Go to [forms.google.com](https://forms.google.com)
2. Click "Create a new form" (+ icon)
3. Title your form: "Boom-In Network Contact Form"

### Step 2: Add Form Fields (EXACT ORDER MATTERS!)

Add these 3 questions in this exact order:

1. **Name** (Short answer, Required)
2. **Email** (Short answer, Required)
3. **Message** (Paragraph, Required)

### Step 3: Get Form URL and Field IDs

1. Click "Send" button → Link icon → Copy the URL
2. **Find Field IDs** (this is the tricky part):
   - Right-click on the **Name field** → "Inspect Element"
   - Look for something like `name="entry.123456789"`
   - Copy the numbers after "entry." (e.g., `123456789`)
   - Repeat for Email and Message fields
   - Write them down!

### Step 4: Update Your Website Code

Open `script.js` and replace these values:

```javascript
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/YOUR_FORM_ID/viewform";
const NAME_FIELD = "entry.1752235031"; // Your actual Name field ID
const EMAIL_FIELD = "entry.1965386154"; // Your actual Email field ID
const MESSAGE_FIELD = "entry.1342546266"; // Your actual Message field ID
```

### Step 5: Set Up Email Notifications

1. In your Google Form → "Responses" tab
2. Three dots menu → "Get email notifications for new responses"
3. You'll get emails when people submit!

---

## How This Works:

✅ **Users see your beautiful form design**  
✅ **Form submits directly to Google Sheets**  
✅ **No page redirect - stays on your site**  
✅ **You get email notifications**  
✅ **100% free forever**

## Need Help Finding Field IDs?

If you're having trouble finding the field IDs:

1. Fill out your Google Form once
2. Right-click → "View Page Source"
3. Search for "entry." - you'll see all the field IDs listed

**Example:**

- Name field might be: `entry.1234567890`
- Email field might be: `entry.0987654321`
- Message field might be: `entry.1122334455`

---

## Option 2: Formspree (Also Free)

If you prefer to keep your current form design, you can use Formspree:

### Setup:

1. Go to [formspree.io](https://formspree.io)
2. Sign up with your email
3. Create a new form
4. Copy your form endpoint (looks like: `https://formspree.io/f/abcd1234`)

### Update your HTML:

Replace your current form tag with:

```html
<form
  class="contact-form"
  id="contactForm"
  action="https://formspree.io/f/YOUR_FORM_ID"
  method="POST"
></form>
```

### Update your JavaScript:

Replace the current form handler with:

```javascript
// No JavaScript needed - form submits directly to Formspree!
```

---

## Which Option Should You Choose?

**Google Forms:**

- ✅ Completely free forever
- ✅ Automatic email notifications
- ✅ View responses in Google Sheets
- ✅ Most reliable
- ❌ Takes users to Google's page

**Formspree:**

- ✅ Users stay on your website
- ✅ Free for 50 submissions/month
- ✅ Easy setup
- ❌ Limited free plan
- ❌ Need to upgrade for more features

**Recommendation:** Start with Google Forms - it's completely free and very reliable!
