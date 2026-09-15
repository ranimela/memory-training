# VERIQ — Design System & Product UI Specification

## 1. Project Overview

**Project Name:** VERIQ  
**Tagline:** *Know Before You Buy.*  
**Problem Statement:** SIH26034  
**Organization:** Ministry of Consumer Affairs, Food & Public Distribution  
**Department:** Department of Consumer Affairs (DoCA)  
**Category:** Software  

VERIQ is a web-based product compliance and inspection platform designed to help inspectors and authorized users scan packaged products, extract declarations from labels, verify compliance with mandatory declaration requirements, identify readability and labeling issues, attach supporting evidence, and generate compliance reports.

The platform should feel:

- Trustworthy
- Government-ready
- Modern
- Clean
- Transparent
- Professional
- Easy to understand
- Efficient for inspection workflows

---

# 2. Design Direction

The interface should follow a clean SaaS-style layout with strong visual hierarchy and a trustworthy blue-led color palette.

The design should avoid overly decorative visuals and focus on:

- Clear data presentation
- Easy scanning workflows
- Strong compliance status visibility
- Large primary actions
- Minimal clutter
- Accessible typography
- Consistent card layouts
- Clear distinction between compliant, non-compliant, warning, and review states

The overall style should feel like a combination of:

- Government service portal
- Modern compliance dashboard
- Enterprise SaaS platform
- Consumer safety application

---

# 3. Brand Identity

## Brand Name

**VERIQ**

Possible interpretation:

- Verify + IQ
- Verification + Intelligence
- Smart product verification

## Brand Personality

VERIQ should communicate:

- Trust
- Transparency
- Accuracy
- Intelligence
- Safety
- Reliability

## Suggested Taglines

Primary:

**Know Before You Buy.**

Alternative options:

- Scan. Verify. Report.
- Transparency Builds Trust.
- Smarter Compliance. Safer Consumers.
- Real Products. Real Information.
- Verify What Matters.

---

# 4. Color Palette

## Primary Colors

### Deep Trust Blue

**Hex:** `#155EEF`

Usage:

- Primary buttons
- Active navigation
- Links
- Important actions
- Selected tabs
- Progress indicators

Meaning:

- Trust
- Reliability
- Security

---

### Navy

**Hex:** `#0B1F3A`

Usage:

- Header
- Sidebar
- Footer
- Dark sections
- Important headings

Meaning:

- Authority
- Stability
- Professionalism

---

### Teal

**Hex:** `#0E9F9A`

Usage:

- Secondary buttons
- Highlights
- Scan states
- Informational graphics
- Technology-related accents

Meaning:

- Transparency
- Freshness
- Technology

---

## Neutral Colors

### Background

**Hex:** `#F7FAFC`

Usage:

- Main page background
- Section background
- Dashboard background

---

### Card White

**Hex:** `#FFFFFF`

Usage:

- Cards
- Tables
- Forms
- Modals
- Content containers

---

### Primary Text

**Hex:** `#1E293B`

Usage:

- Body text
- Headings
- Labels

---

### Secondary Text

**Hex:** `#64748B`

Usage:

- Metadata
- Helper text
- Secondary information
- Descriptions

---

## Status Colors

### Success / Verified

**Hex:** `#16A34A`

Usage:

- Compliant status
- Verified badges
- Successful checks
- Approved declarations

---

### Warning

**Hex:** `#F59E0B`

Usage:

- Needs review
- Minor issues
- Readability warnings
- Non-standard declarations

---

### Error / Non-Compliant

Recommended:

**Hex:** `#DC2626`

Usage:

- Non-compliance
- Missing declarations
- Enforcement alerts
- Serious violations

---

# 5. Typography

Recommended font families:

- Inter
- Manrope
- Plus Jakarta Sans
- DM Sans

Recommended default:

**Inter**

## Typography Scale

### H1
- 40–48 px desktop
- 32–36 px tablet
- 28–32 px mobile
- Font weight: 700

### H2
- 28–32 px
- Font weight: 700

### H3
- 20–24 px
- Font weight: 600

### Body
- 16 px
- Font weight: 400

### Small Text
- 13–14 px
- Font weight: 400

### Button Text
- 14–16 px
- Font weight: 600

---

# 6. Layout System

## Desktop

Use a responsive 12-column grid.

Recommended max width:

`1280px–1440px`

Page padding:

`24px–40px`

Card radius:

`12px–16px`

Button radius:

`8px–12px`

Card gap:

`16px–24px`

---

# 7. Website Navigation

## Public Navigation

- Home
- About
- Features
- How It Works
- Contact
- Login
- Get Started

## Application Navigation

Primary top navigation:

- Dashboard
- Scan Product
- Repository
- Reports
- Enforcement

Secondary / profile navigation:

- Notifications
- Role
- Profile
- Settings
- Logout

Alternative left sidebar navigation:

- Dashboard
- Scan Product
- My Inspections
- Product Repository
- Reports
- Enforcement
- Settings

---

# 8. Landing Page

## Hero Section

### Left Side

Headline:

**Know What You’re Buying.**

Supporting text:

Scan, verify and understand packaged product information. Detect missing or misleading declarations, analyze readability and generate compliance reports.

Primary CTA:

**Scan a Product**

Secondary CTA:

**Watch How It Works**

### Right Side

Visual:

- Smartphone scanning a packaged product
- Barcode or label focus frame
- Verification badge
- Product packaging image

---

## Feature Strip

Display four quick capabilities:

### Scan & Extract

Extract product details from labels and packaging.

### Check Compliance

Detect missing, misleading or non-standard declarations.

### Readability Analysis

Evaluate font size, visibility and legibility.

### Generate Reports

Generate compliance and inspection reports.

---

## Trust Section

Heading:

**Trusted by Government. Built for a Safer Tomorrow.**

Supporting points:

- Scan Products in Real Time
- Ensure Legal Compliance
- Support Enforcement Activities
- Build a Transparent Marketplace

---

# 9. Authentication

## Login Screen

Fields:

- Email / ID
- Password

Actions:

- Login
- Forgot Password
- Remember Me

Optional:

- Login with Government ID
- Role-based authentication

---

# 10. Role-Based Access

## Inspector

Permissions:

- Scan products
- Analyze labels
- View inspection history
- Generate reports
- Attach evidence
- Create enforcement cases

## Admin

Permissions:

- Manage users
- Manage roles
- View all inspections
- Monitor compliance
- Track enforcement
- Access analytics
- Configure settings

## Reviewer

Permissions:

- Review reports
- Verify evidence
- Approve compliance status
- Review assigned cases

---

# 11. Dashboard

## Main Greeting

Example:

**Good Morning, Inspector**

Subtext:

Here’s an overview of your recent activity and compliance status.

---

## Summary Cards

### Total Products Scanned

Example:

`248`

### Compliant

Example:

`186`

### Non-Compliant

Example:

`42`

### Needs Review

Example:

`20`

---

## Dashboard Modules

### Compliance Status

Use:

- Donut chart
- Progress ring
- Category percentages

### Recent Inspections

Show:

- Product image
- Product name
- Date
- Status
- Action

### Quick Actions

Buttons:

- Scan Product
- Upload Image
- Generate Report
- View Repository

---

# 12. Scan Product Page

This is the most important workflow in the application.

## Main Scan Options

Feature buttons:

- Upload Image
- Take Photo
- Scan Barcode / QR
- Capture Label
- Enter Manually

## Upload Area

Drag and drop section:

**Drag and drop an image here**

Button:

**Choose File**

Supported formats:

- JPG
- PNG
- WEBP

---

## Tips Panel

Display quick image capture guidelines:

- Capture the full label
- Ensure good lighting
- Avoid glare and blur
- Keep text in focus
- Capture all sides if required

---

## Primary Action

**Analyze Product**

---

# 13. Product Analysis Page

The analysis page should show the scan progress as:

**Extract → Verify → Analyze → Report**

## Product Header

Show:

- Product image
- Product name
- Brand
- Product category
- Compliance badge

---

## Main Tabs

- Overview
- Declarations
- Mandatory Checks
- Readability
- Issues
- Evidence

---

# 14. Declaration Extraction

Automatically extract:

- Product Name
- Brand
- Net Quantity
- MRP
- Manufacturer / Packer
- Manufacturing Date
- Best Before / Use By
- Country of Origin
- Consumer Care Details
- Batch / Lot Number
- Barcode
- Other declarations

Each declaration should show:

- Detected value
- Confidence level
- Compliance status
- Edit option
- Evidence reference

---

# 15. Mandatory Declaration Check

Each mandatory declaration should display:

- Declaration name
- Present / Missing
- Compliance status
- Related rule
- Evidence image

Example states:

✅ Present  
⚠ Needs Review  
❌ Missing

---

# 16. Font Size & Readability Analysis

Analyze:

- Font size
- Font visibility
- Contrast
- Legibility
- Placement
- Text spacing
- Background interference

Display metric cards:

### Average Font Size

Example:

`8.5 pt`

### Visibility

`Good`

### Contrast

`High`

### Legibility

`Excellent`

---

# 17. Issue Detection

Group detected issues into:

## Missing Declarations

Example:

- Consumer care details missing

## Misleading Declarations

Example:

- Promotional claim inconsistent with label data

## Non-Standard Declarations

Example:

- Incorrect unit format

## Readability Issues

Example:

- Font below acceptable size

---

# 18. Compliance Scoring

Display a visual compliance score.

Example:

**82 / 100**

Status:

**Compliant**

Possible statuses:

- Compliant
- Non-Compliant
- Needs Review
- Pending Verification

Use a circular progress indicator.

---

# 19. Compliance Report Page

## Report Header

Show:

- Product
- Brand
- Inspection ID
- Inspector
- Date
- Final compliance status

## Report Sections

- Summary
- Detailed Findings
- Mandatory Declarations
- Readability
- Evidence
- Inspection History

---

## Report Actions

Feature buttons:

- Generate Report
- Download PDF
- Export Editable
- Share Report
- Add Evidence
- Print Report

Editable formats can include:

- DOCX
- XLSX
- CSV where relevant

---

# 20. Evidence Management

Users should be able to attach:

- Product photos
- Label photos
- Packaging photos
- Supporting documents
- Screenshots
- Inspection notes

Actions:

- Add Evidence
- View Evidence
- Download Evidence
- Remove Evidence
- Mark Evidence as Verified

---

# 21. Product Repository

## Repository Header

Search bar:

**Search products by name, barcode or manufacturer**

Filters:

- All
- Compliant
- Non-Compliant
- Needs Review
- Recently Scanned

---

## Table Columns

- Product Name
- Brand
- Net Quantity
- Status
- Last Scanned
- Inspector
- Actions

---

# 22. Product Details Page

Tabs:

- Overview
- History
- Reports
- Evidence

## Overview

Display:

- Brand
- Manufacturer
- MRP
- Net Quantity
- Best Before
- Consumer Care

## Previous Scans

Show inspection timeline with:

- Date
- Compliance status
- Inspector
- Report link

---

# 23. Inspection History

Feature buttons:

- All Inspections
- Recent Inspections
- Flagged
- Completed
- Pending Review

Each inspection should include:

- Inspection ID
- Product
- Date
- Inspector
- Status
- Report
- Evidence

---

# 24. Enforcement Dashboard

## Summary Cards

- Active Cases
- Pending Actions
- Resolved Cases
- Repeat Violations

---

## Violation Table

Columns:

- Product
- Violation
- Date
- Severity
- Status
- Action

Severity indicators:

- Low
- Medium
- High
- Critical

---

## Main Enforcement Action

**Create Enforcement Case**

---

# 25. Reports Dashboard

Filters:

- Date Range
- Product
- Manufacturer
- Inspector
- Compliance Status

Report cards:

- Compliance Summary
- Violation Trends
- Inspection Activity
- Repeat Violations
- Product Category Compliance
- Enforcement Activity

Actions:

- Generate
- Export
- Download
- Share

---

# 26. UI Components

## Primary Button

Background:

`#155EEF`

Text:

`#FFFFFF`

Example:

**Scan Product**

---

## Secondary Button

Background:

Transparent / White

Border:

`#0E9F9A`

Text:

`#0E9F9A`

---

## Success Badge

Background:

Light green

Text:

`#16A34A`

Example:

**Verified**

---

## Warning Badge

Background:

Light amber

Text:

`#F59E0B`

Example:

**Needs Review**

---

## Error Badge

Background:

Light red

Text:

`#DC2626`

Example:

**Non-Compliant**

---

# 27. Card Design

Cards should use:

- White background
- 12–16 px radius
- 1 px subtle border
- Soft shadow
- 16–24 px internal padding

Avoid heavy shadows.

---

# 28. Icon Style

Use simple outline icons.

Recommended icon libraries:

- Lucide
- Heroicons
- Material Symbols

Suggested icons:

- Camera → Scan
- Upload → Upload Image
- Shield Check → Compliance
- Clipboard → Inspection
- File Text → Reports
- Package → Repository
- Alert Triangle → Violations
- Scale → Legal Metrology
- Search → Search
- Download → Export

---

# 29. UX Flow

Primary inspection workflow:

**Login**

↓

**Dashboard**

↓

**Scan Product**

↓

**Upload / Capture Product**

↓

**Extract Label Data**

↓

**Check Mandatory Declarations**

↓

**Analyze Readability**

↓

**Detect Issues**

↓

**Calculate Compliance Status**

↓

**Attach Evidence**

↓

**Generate Report**

↓

**Save to Repository**

↓

**Create Enforcement Case if Required**

---

# 30. Core Feature Buttons

The following buttons should appear across the product:

## Scanning

- Scan Product
- Upload Image
- Take Photo
- Scan Barcode / QR
- Capture Label
- Enter Manually

## Analysis

- Analyze Product
- Run Compliance Check
- View Declarations
- Check Readability
- View Issues

## Reporting

- Generate Report
- Download PDF
- Export Editable
- Share Report
- Print Report

## Repository

- View Product
- View History
- View Report
- Search Products
- Filter Products

## Evidence

- Add Evidence
- View Evidence
- Verify Evidence

## Enforcement

- Create Enforcement Case
- View Violations
- Pending Actions
- Resolved Cases
- Repeat Violations

---

# 31. Accessibility

The website should follow accessibility-focused UI design.

Requirements:

- Minimum 4.5:1 contrast for body text
- Visible keyboard focus states
- Icons accompanied by text where needed
- Form labels always visible
- Error messages should not rely only on color
- Large clickable areas
- Minimum button height around 44 px
- Alt text for product images
- Accessible tables
- Screen-reader-friendly forms

---

# 32. Responsive Design

## Desktop

Use full dashboard with left sidebar or top navigation.

## Tablet

Use collapsed sidebar.

## Mobile

Use bottom navigation:

- Home
- Scan
- Products
- Reports
- Profile

The central **Scan** action should be visually prominent.

---

# 33. Motion & Interaction

Keep animations subtle.

Recommended:

- 150–250 ms transitions
- Loading progress during image analysis
- Animated compliance score
- Status change feedback
- Scan frame pulse
- Smooth tab transitions

Avoid excessive animations.

---

# 34. Empty States

Example:

**No products scanned yet**

Supporting text:

Start by scanning or uploading a packaged product.

CTA:

**Scan Product**

---

# 35. Loading States

During scanning:

**Extracting product information…**

During compliance check:

**Checking mandatory declarations…**

During report generation:

**Generating compliance report…**

Use progress indicators rather than blank screens.

---

# 36. Error States

Example:

**Unable to read the label clearly**

Suggestions:

- Upload a clearer image
- Avoid reflections
- Capture the complete label
- Ensure sufficient lighting

CTA:

**Try Again**

---

# 37. Security UI

The interface should visually support secure usage.

Features:

- Secure login
- Role-based permissions
- Session management
- Activity history
- Audit logs
- Secure report access

Sensitive actions should require confirmation.

---

# 38. Design Principles

### 1. Trust First

Every screen should communicate reliability and authority.

### 2. Scan First

Scanning should always be easy to access.

### 3. Explain Compliance

Never display only a score. Explain why a product passed or failed.

### 4. Evidence-Based

Every violation should link to supporting evidence.

### 5. Reduce Inspector Effort

Minimize manual typing wherever possible.

### 6. Clear Status Language

Use:

- Compliant
- Non-Compliant
- Needs Review
- Pending

Avoid ambiguous labels.

### 7. Actionable Reports

Reports should clearly explain what is wrong and what rule is affected.

---

# 39. Recommended Homepage Message

## Hero

**Know What You’re Buying.**

Scan, verify and understand packaged product information with intelligent compliance analysis.

Primary CTA:

**Scan a Product**

Secondary CTA:

**Explore Features**

---

# 40. Final Product Experience

VERIQ should feel like a professional government-grade product compliance platform rather than a generic shopping application.

The strongest demonstration flow for SIH is:

> An inspector uploads or captures a packaged product image. VERIQ extracts the label declarations, checks mandatory requirements, evaluates readability, identifies possible violations, attaches supporting evidence, calculates the compliance status, generates a formal report, saves the inspection to the repository, and allows enforcement action when required.

This flow should remain the central focus of the website design and prototype.
