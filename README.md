# Teeth Care Dental Clinic, Karachi — Official Website

A production-quality, responsive website for **Teeth Care Dental Clinic** located in Gulshan-e-Iqbal, Karachi, Pakistan. Built with React, TypeScript, Tailwind CSS, and Vite.

---

## 📍 Verified Public Business Information

The following verified public listing details are configured in `src/data/business.ts`:

- **Business Name:** Teeth Care Dental Clinic
- **Business Category:** Dental Clinic
- **City:** Karachi, Sindh, Pakistan
- **Address:** Shop 1, Block 13C, Gulshan-e-Iqbal, Karachi, 75300, Pakistan
- **Telephone (Click-to-Call):** `+92 336 1879257` (`tel:+923361879257`)
- **Google Maps Listing:** [https://maps.app.goo.gl/hEQYKBbEUkpJcd7y5](https://maps.app.goo.gl/hEQYKBbEUkpJcd7y5)
- **Google Rating:** 5.0 ★ (15+ verified Google reviews)
- **Operating Hours:**
  - Monday – Thursday: 1:00 PM – 11:30 PM
  - Friday: 4:00 PM – 11:30 PM (after Friday prayers)
  - Saturday: 1:00 PM – 11:30 PM
  - Sunday: Unverified (Notice prompts patient to call ahead)

---

## 🔐 Doctor & Admin Portal (Staff Access)

An administrative portal is embedded in the website footer for the attending dental surgeons and clinic reception staff to review and manage patient appointment requests.

- **Access Location:** Click **"Doctor / Admin Portal"** in the footer.
- **Required Password:** `Muntazim99`

### Doctor Portal Features:
- **Real-Time Appointment Stream:** Automatically collects every booking submitted through the patient request form.
- **Live Status Management:** Update appointment status to *Pending*, *Confirmed*, *Completed*, or *Cancelled*.
- **Patient Direct Actions:**
  - One-click telephone dialer (`tel:`)
  - One-click WhatsApp message with prefilled confirmation text
- **Clinical Doctor Notes:** Write and edit internal clinical notes per patient (e.g., tooth numbers, prescribed medication, follow-up dates).
- **Walk-in & Phone Booking:** Quickly log manual appointments taken over the phone or at the front desk.
- **Export to CSV:** Download all appointments as a spreadsheet backup.

---

## 🛡️ Medical Transparency & Integrity Rules Followed

1. **WhatsApp Functionality:** The WhatsApp number is currently unconfirmed and therefore safely hidden in accordance with project instructions (telephone is not assumed to be a WhatsApp line). To enable, set `whatsappNumber: "923361879257"` in `src/data/business.ts`.
2. **Team & Practitioner Section:** Doctor names and PMDC credentials have not been invented. A neutral notice directs patients to call the reception desk for practitioner availability.
3. **Authentic Reviews:** Links directly to the original Google Maps listing; no artificial review texts or fabricated testimonials are generated.
4. **Treatment Pricing:** Marked with *"Contact clinic for pricing"* until verified clinic fee schedules are provided.
5. **Urdu Language Support:** Full bilingual interface toggle (English / اردو) tailored to Karachi patients.

---

## 🛠️ How to Update Business Details

All clinic data is consolidated in a single file:
👉 **`src/data/business.ts`**

- To add doctor credentials: add items to `businessData.team.members` and set `businessData.team.isVerified = true`.
- To enable WhatsApp: set `businessData.contact.whatsappNumber = "923361879257"`.
- To update operating hours: adjust entries in `businessData.operatingHours`.

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start development server on port 3000
npm run dev

# Build production bundle
npm run build
```

---

## 🌐 Deploying to GitHub Pages (Recommended Method)

This project is pre-configured with `base: './'` in `vite.config.ts` and includes a GitHub Actions workflow in `.github/workflows/deploy.yml`.

### Step 1: Push code to your GitHub repository
If you haven't initialized git yet:
```bash
git init
git add .
git commit -m "Initial commit for Teeth Care Dental Clinic"
git branch -M main
git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git
git push -u origin main
```

### Step 2: Enable GitHub Pages in your repository settings
1. Open your repository on **GitHub**.
2. Click on the **Settings** tab.
3. On the left sidebar, click **Pages** (under the "Code and automation" section).
4. Under **Build and deployment > Source**, select:
   👉 **GitHub Actions**
5. That's it! GitHub will automatically trigger the deployment workflow.
6. Within ~1 minute, your site will be live at:
   `https://<YOUR-USERNAME>.github.io/<YOUR-REPO-NAME>/`

---

## 🌐 Deploying to Vercel (Alternative)

1. Push this repository to GitHub or GitLab.
2. In Vercel, click **"Add New Project"** and import the repository.
3. Framework Preset: **Vite**.
4. Root Directory: `./`
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Click **Deploy**.
