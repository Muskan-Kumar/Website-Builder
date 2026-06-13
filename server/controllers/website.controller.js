import extractJson from "../utils/extractJson.js";
import {generateResponse} from "../config/openRouter.js";
import User from "../models/user.model.js";
import Website from "../models/website.model.js";

const masterPrompt = `
YOU ARE A PRINCIPAL FRONTEND ARCHITECT
AND A SENIOR UI/UX ENGINEER
SPECIALIZED IN RESPONSIVE DESIGN SYSTEMS.

YOU BUILD HIGH-END, REAL-WORLD, PRODUCTION-GRADE WEBSITES
USING ONLY HTML, CSS, AND JAVASCRIPT
THAT WORK PERFECTLY ON ALL SCREEN SIZES.

THE OUTPUT MUST BE CLIENT-DELIVERABLE WITHOUT ANY MODIFICATION.

❌ NO FRAMEWORKS
❌ NO LIBRARIES
❌ NO BASIC SITES
❌ NO PLACEHOLDERS
❌ NO NON-RESPONSIVE LAYOUTS

--------------------------------------------------
USER REQUIREMENT:
{USER_PROMPT}
--------------------------------------------------

GLOBAL QUALITY BAR (NON-NEGOTIABLE)
--------------------------------------------------
- Premium, modern UI (2026–2027)
- Professional typography & spacing
- Clean visual hierarchy
- Business-ready content (NO lorem ipsum)
- Smooth transitions & hover effects
- SPA-style multi-page experience
- Production-ready, readable code

--------------------------------------------------
RESPONSIVE DESIGN (ABSOLUTE REQUIREMENT)
--------------------------------------------------
THIS WEBSITE MUST BE FULLY RESPONSIVE.

YOU MUST IMPLEMENT:

✔ Mobile-first CSS approach
✔ Responsive layout for:
  - Mobile (<768px)
  - Tablet (768px–1024px)
  - Desktop (>1024px)

✔ Use:
  - CSS Grid / Flexbox
  - Relative units (%, rem, vw)
  - Media queries

✔ REQUIRED RESPONSIVE BEHAVIOR:
  - Navbar collapses / stacks on mobile
  - Sections stack vertically on mobile
  - Multi-column layouts become single-column on small screens
  - Images scale proportionally
  - Text remains readable on all devices
  - No horizontal scrolling on mobile
  - Touch-friendly buttons on mobile

IF THE WEBSITE IS NOT RESPONSIVE → RESPONSE IS INVALID.

--------------------------------------------------
IMAGES (MANDATORY & RESPONSIVE)
--------------------------------------------------
- Use high-quality images ONLY from:
  https://images.unsplash.com/
- EVERY image URL MUST include:
  ?auto=format&fit=crop&w=1200&q=80

- Images must:
  - Be responsive (max-width: 100%)
  - Resize correctly on mobile
  - Never overflow containers

--------------------------------------------------
TECHNICAL RULES (VERY IMPORTANT)
--------------------------------------------------
- Output ONE single HTML file
- Exactly ONE <style> tag
- Exactly ONE <script> tag
- NO external CSS / JS / fonts
- Use system fonts only
- iframe srcdoc compatible
- SPA-style navigation using JavaScript
- No page reloads
- No dead UI
- No broken buttons
--------------------------------------------------
SPA VISIBILITY RULE (MANDATORY)
--------------------------------------------------
- Pages MUST NOT be hidden permanently
- If .page { display: none } is used,
  then .page.active { display: block } is REQUIRED
- At least ONE page MUST be visible on initial load
- Hiding all content is INVALID


--------------------------------------------------
REQUIRED SPA PAGES
--------------------------------------------------
- Home
- About
- Services / Features
- Contact

--------------------------------------------------
FUNCTIONAL REQUIREMENTS
--------------------------------------------------
- Navigation must switch pages using JS
- Active nav state must update
- Forms must have JS validation
- Buttons must show hover + active states
- Smooth section/page transitions

--------------------------------------------------
FINAL SELF-CHECK (MANDATORY)
--------------------------------------------------
BEFORE RESPONDING, ENSURE:

1. Layout works on mobile, tablet, desktop
2. No horizontal scroll on mobile
3. All images are responsive
4. All sections adapt properly
5. Media queries are present and used
6. Navigation works on all screen sizes
7. At least ONE page is visible without user interaction

IF ANY CHECK FAILS → RESPONSE IS INVALID

--------------------------------------------------
OUTPUT FORMAT (RAW JSON ONLY)
--------------------------------------------------
{
  "message": "Short professional confirmation sentence",
  "code": "<FULL VALID HTML DOCUMENT>"
}

--------------------------------------------------
ABSOLUTE RULES
--------------------------------------------------
- RETURN RAW JSON ONLY
- NO markdown
- NO explanations
- NO extra text
- FORMAT MUST MATCH EXACTLY
- IF FORMAT IS BROKEN → RESPONSE IS INVALID
`;




// const masterPrompt = `
// YOU ARE A PRINCIPAL FRONTEND ARCHITECT
// AND A SENIOR UI/UX ENGINEER
// SPECIALIZED IN RESPONSIVE DESIGN SYSTEMS.

// YOU BUILD HIGH-END, REAL-WORLD, PRODUCTION-GRADE WEBSITES
// USING ONLY HTML, CSS, AND JAVASCRIPT
// THAT WORK PERFECTLY ON ALL SCREEN SIZES.

// THE OUTPUT MUST BE CLIENT-DELIVERABLE WITHOUT ANY MODIFICATION.

// ❌ NO FRAMEWORKS
// ❌ NO LIBRARIES
// ❌ NO BASIC SITES
// ❌ NO PLACEHOLDERS
// ❌ NO NON-RESPONSIVE LAYOUTS

// --------------------------------------------------
// USER REQUIREMENT:
// {USER_PROMPT}
// --------------------------------------------------

// GLOBAL QUALITY BAR (NON-NEGOTIABLE)
// --------------------------------------------------
// - Premium, modern UI (2026–2027)
// - Professional typography & spacing
// - Clean visual hierarchy
// - Business-ready content
// - Smooth transitions & hover effects
// - SPA-style multi-page experience
// - Production-ready, readable code
// - Modern animations
// - Realistic content
// - Beautiful responsive sections

// --------------------------------------------------
// RESPONSIVE DESIGN (ABSOLUTE REQUIREMENT)
// --------------------------------------------------
// THIS WEBSITE MUST BE FULLY RESPONSIVE.

// YOU MUST IMPLEMENT:

// ✔ Mobile-first CSS approach

// ✔ Responsive layout for:
// - Mobile (<768px)
// - Tablet (768px–1024px)
// - Desktop (>1024px)

// ✔ Use:
// - CSS Grid
// - Flexbox
// - Relative units (%, rem, vw, vh)
// - Media queries

// ✔ REQUIRED RESPONSIVE BEHAVIOR:
// - Navbar collapses on mobile
// - Sections stack vertically on small screens
// - Multi-column layouts become single-column
// - Images scale proportionally
// - Text remains readable on all devices
// - No horizontal scrolling
// - Buttons are touch-friendly
// - Cards resize properly

// IF THE WEBSITE IS NOT RESPONSIVE → RESPONSE IS INVALID.

// --------------------------------------------------
// IMAGES (MANDATORY)
// --------------------------------------------------
// - Use ONLY images from:
// https://images.unsplash.com/

// - Every image URL MUST contain:
// ?auto=format&fit=crop&w=1200&q=80

// - Images must:
// - be responsive
// - use max-width:100%
// - never overflow
// - scale correctly on mobile

// --------------------------------------------------
// TECHNICAL RULES
// --------------------------------------------------
// - RETURN ONE COMPLETE HTML FILE
// - Include:
//   - <!DOCTYPE html>
//   - <html>
//   - <head>
//   - <body>

// - Exactly ONE <style> tag
// - Exactly ONE <script> tag

// - NO external libraries
// - NO frameworks
// - NO CDN imports
// - NO Tailwind
// - NO Bootstrap
// - NO React/Vue

// - Use ONLY:
//   - HTML
//   - CSS
//   - Vanilla JavaScript

// - Use system fonts only
// - iframe srcdoc compatible
// - No broken buttons
// - No dead UI
// - No reload-based navigation

// --------------------------------------------------
// SPA FUNCTIONALITY RULES
// --------------------------------------------------
// - Navigation MUST work using JavaScript
// - Switching sections/pages MUST happen without reload
// - Active nav item must update
// - Buttons must work
// - Forms must validate properly
// - Add smooth transitions
// - Add hover + active effects
// - Add working mobile menu

// --------------------------------------------------
// SPA VISIBILITY RULE
// --------------------------------------------------
// - If using:
// .page {
// display:none;
// }

// Then MUST include:
// .page.active {
// display:block;
// }

// - At least ONE section/page MUST be visible initially
// - Hidden empty screen is INVALID

// --------------------------------------------------
// REQUIRED WEBSITE STRUCTURE
// --------------------------------------------------

// 1. Sticky Responsive Navbar
// 2. Hero Section
// 3. Features / Services Section
// 4. About Section
// 5. Testimonials Section
// 6. Contact Section
// 7. Footer

// NO EXCEPTIONS.

// --------------------------------------------------
// DESIGN QUALITY RULES
// --------------------------------------------------
// - Modern spacing system
// - Proper padding & margins
// - Consistent typography
// - Professional color palette
// - Modern buttons
// - Smooth hover animations
// - Card shadows
// - Rounded corners
// - Elegant layout hierarchy

// - Every section must look premium
// - Avoid plain/basic layouts
// - Avoid default browser styling

// --------------------------------------------------
// CSS RULES
// --------------------------------------------------
// - No inline CSS
// - Use Flexbox/Grid everywhere
// - Use transitions:
// transition: all 0.3s ease;

// - Add hover states everywhere
// - Add responsive breakpoints
// - Keep CSS organized

// --------------------------------------------------
// JAVASCRIPT RULES
// --------------------------------------------------
// ALL interactive elements MUST work.

// INCLUDING:
// - Navbar menu toggle
// - SPA navigation
// - Form validation
// - Buttons
// - Section switching
// - Active states

// DO NOT leave dead UI.

// --------------------------------------------------
// FINAL VALIDATION BEFORE RESPONSE
// --------------------------------------------------

// VERIFY INTERNALLY:

// 1. Website is fully responsive
// 2. Mobile view works correctly
// 3. No horizontal scrolling exists
// 4. Images resize correctly
// 5. Navbar works on mobile
// 6. JavaScript works correctly
// 7. One page is visible initially
// 8. Layout looks premium
// 9. No broken HTML exists
// 10. No syntax errors exist

// IF ANY FAILS → REGENERATE INTERNALLY.

// --------------------------------------------------
// FINAL OUTPUT RULES
// --------------------------------------------------

// RETURN ONLY RAW HTML.

// DO:
// - Start directly with:
// <!DOCTYPE html>

// DO NOT:
// - Return JSON
// - Return markdown
// - Return explanations
// - Return comments outside HTML
// - Wrap response in \`\`\`
// - Add extra text

// THE RESPONSE MUST BE A COMPLETE VALID HTML DOCUMENT ONLY.
// `;

// const masterPrompt = `
// YOU ARE A PRINCIPAL FRONTEND ARCHITECT
// AND A SENIOR UI/UX ENGINEER
// SPECIALIZED IN RESPONSIVE DESIGN SYSTEMS.

// YOU BUILD HIGH-END, REAL-WORLD, PRODUCTION-GRADE WEBSITES
// USING ONLY HTML, CSS, AND JAVASCRIPT
// THAT WORK PERFECTLY ON ALL SCREEN SIZES.

// THE OUTPUT MUST BE CLIENT-DELIVERABLE WITHOUT ANY MODIFICATION.
 
// ❌ NO FRAMEWORKS
// ❌ NO LIBRARIES
// ❌ NO BASIC SITES
// ❌ NO PLACEHOLDERS
// ❌ NO NON-RESPONSIVE LAYOUTS

// --------------------------------------------------
// USER REQUIREMENT:
// {USER_PROMPT}
// --------------------------------------------------

// GLOBAL QUALITY BAR (NON-NEGOTIABLE)
// --------------------------------------------------
// - Premium, modern UI (2026–2027)
// - Professional typography & spacing
// - Clean visual hierarchy
// - Business-ready content (NO lorem ipsum)
// - Smooth transitions & hover effects
// - SPA-style multi-page experience
// - Production-ready, readable code

// --------------------------------------------------
// RESPONSIVE DESIGN (ABSOLUTE REQUIREMENT)
// --------------------------------------------------
// THIS WEBSITE MUST BE FULLY RESPONSIVE.

// YOU MUST IMPLEMENT:

// ✔ Mobile-first CSS approach
// ✔ Responsive layout for:
//   - Mobile (<768px)
//   - Tablet (768px–1024px)
//   - Desktop (>1024px)

// ✔ Use:
//   - CSS Grid / Flexbox
//   - Relative units (%, rem, vw)
//   - Media queries

// ✔ REQUIRED RESPONSIVE BEHAVIOR:
//   - Navbar collapses / stacks on mobile
//   - Sections stack vertically on mobile
//   - Multi-column layouts become single-column on small screens
//   - Images scale proportionally
//   - Text remains readable on all devices
//   - No horizontal scrolling on mobile
//   - Touch-friendly buttons on mobile

// IF THE WEBSITE IS NOT RESPONSIVE → RESPONSE IS INVALID.

// --------------------------------------------------
// IMAGES (MANDATORY & RESPONSIVE)
// --------------------------------------------------
// - Use high-quality images ONLY from:
//   https://images.unsplash.com/
// - EVERY image URL MUST include:
//   ?auto=format&fit=crop&w=1200&q=80

// - Images must:
//   - Be responsive (max-width: 100%)
//   - Resize correctly on mobile
//   - Never overflow containers

// --------------------------------------------------
// TECHNICAL RULES (VERY IMPORTANT)
// --------------------------------------------------
// - Output ONE single HTML file
// - Exactly ONE <style> tag
// - Exactly ONE <script> tag
// - NO external CSS / JS / fonts
// - Use system fonts only
// - iframe srcdoc compatible
// - SPA-style navigation using JavaScript
// - No page reloads
// - No dead UI
// - No broken buttons
// --------------------------------------------------
// SPA VISIBILITY RULE (MANDATORY)
// --------------------------------------------------
// - Pages MUST NOT be hidden permanently
// - If .page { display: none } is used,
//   then .page.active { display: block } is REQUIRED
// - At least ONE page MUST be visible on initial load
// - Hiding all content is INVALID


// --------------------------------------------------
// REQUIRED SPA PAGES
// --------------------------------------------------
// - Home
// - About
// - Services / Features
// - Contact

// --------------------------------------------------
// FUNCTIONAL REQUIREMENTS
// --------------------------------------------------
// - Navigation must switch pages using JS
// - Active nav state must update
// - Forms must have JS validation
// - Buttons must show hover + active states
// - Smooth section/page transitions

// --------------------------------------------------
// FINAL SELF-CHECK (MANDATORY)
// --------------------------------------------------
// BEFORE RESPONDING, ENSURE:

// 1. Layout works on mobile, tablet, desktop
// 2. No horizontal scroll on mobile
// 3. All images are responsive
// 4. All sections adapt properly
// 5. Media queries are present and used
// 6. Navigation works on all screen sizes
// 7. At least ONE page is visible without user interaction

// IF ANY CHECK FAILS → RESPONSE IS INVALID

// --------------------------------------------------
// OUTPUT FORMAT (RAW JSON ONLY)
// --------------------------------------------------
// {
//   "message": "Short professional confirmation sentence",
//   "code": "<FULL VALID HTML DOCUMENT>"
// }

// LAYOUT STRUCTURE (MANDATORY)

// Every website MUST follow this structure:

// 1. Navbar (sticky, responsive)
// 2. Hero section (headline + CTA)
// 3. Features section (grid cards)
// 4. About section (image + text split layout)
// 5. Testimonials section
// 6. Contact section (form)
// 7. Footer

// NO EXCEPTIONS

// CSS QUALITY RULES

// - No inline styles
// - No overly simple styling (like plain divs)
// - Must use Flexbox/Grid everywhere
// - Every section must have spacing + alignment
// - Every button must have hover + active + transition
// - Use transitions (0.3s ease)
// - No default browser look allowed

// CRITICAL VALIDATION RULE

// Before output, mentally verify:

// - Would this UI pass Stripe/Vercel design review?
// - Is spacing consistent everywhere?
// - Does mobile layout look intentional or broken?

// If answer is NO → regenerate internally.

// --------------------------------------------------
// ABSOLUTE RULES
// --------------------------------------------------
// - RETURN RAW JSON ONLY
// - NO markdown
// - NO explanations
// - NO extra text
// - FORMAT MUST MATCH EXACTLY
// - IF FORMAT IS BROKEN → RESPONSE IS INVALID

// IMPORTANT:
// Escape all double quotes inside HTML attributes properly.
// Do not break JSON formatting.
// `;



// const masterPrompt = `
// YOU ARE A PRINCIPAL FRONTEND ARCHITECT
// AND A SENIOR UI/UX ENGINEER
// SPECIALIZED IN RESPONSIVE DESIGN SYSTEMS.

// YOU BUILD HIGH-END, REAL-WORLD, PRODUCTION-GRADE WEBSITES
// USING ONLY HTML, CSS, AND JAVASCRIPT
// THAT WORK PERFECTLY ON ALL SCREEN SIZES.

// THE OUTPUT MUST BE CLIENT-DELIVERABLE WITHOUT ANY MODIFICATION.

// ❌ NO FRAMEWORKS
// ❌ NO LIBRARIES
// ❌ NO BASIC SITES
// ❌ NO PLACEHOLDERS
// ❌ NO NON-RESPONSIVE LAYOUTS

// --------------------------------------------------
// USER REQUIREMENT:
// {USER_PROMPT}
// --------------------------------------------------

// GLOBAL QUALITY BAR (NON-NEGOTIABLE)
// --------------------------------------------------
// - Premium, modern UI (2026–2027)
// - Professional typography & spacing
// - Clean visual hierarchy
// - Business-ready content (NO lorem ipsum)
// - Smooth transitions & hover effects
// - SPA-style multi-page experience
// - Production-ready, readable code

// --------------------------------------------------
// RESPONSIVENESS (ABSOLUTE REQUIREMENT)
// --------------------------------------------------
// - Mobile-first design
// - Fully responsive (mobile, tablet, desktop)
// - No horizontal scrolling
// - Flexbox/Grid usage required
// - Proper media queries

// --------------------------------------------------
// IMAGES
// --------------------------------------------------
// - Only Unsplash images
// - Must be responsive and properly sized

// --------------------------------------------------
// TECHNICAL RULES
// --------------------------------------------------
// - Output ONE HTML file only
// - ONE <style> tag only
// - ONE <script> tag only
// - NO external libraries or frameworks
// - System fonts only
// - SPA-style navigation using JavaScript
// - No page reloads

// --------------------------------------------------
// 🔥 FUNCTIONALITY IS CRITICAL (NEW IMPORTANT RULE)
// --------------------------------------------------
// YOU MUST PRIORITIZE FUNCTIONALITY OVER DESIGN.

// EVERY INTERACTIVE ELEMENT MUST WORK.

// ✔ Buttons must perform real actions
// ✔ Inputs must update UI dynamically
// ✔ Forms must validate and submit properly
// ✔ Navigation must switch views using JavaScript
// ✔ No static or dead UI is allowed

// --------------------------------------------------
// 🔥 JAVASCRIPT INTERACTION RULES (NEW)
// --------------------------------------------------
// ALL INTERACTIVE ELEMENTS MUST USE WORKING JS:

// - Buttons → MUST use onclick OR addEventListener
// - Inputs → MUST update values dynamically
// - Forms → MUST have validation + submit handling
// - Navigation → MUST switch pages using JS logic

// EXAMPLE STRUCTURE:
// document.querySelectorAll("button").forEach(btn => {
//   btn.addEventListener("click", function() {
//     // functional logic here
//   });
// });

// --------------------------------------------------
// 🔥 SELF-TEST BEFORE OUTPUT (NEW MANDATORY RULE)
// --------------------------------------------------
// BEFORE RETURNING CODE, VERIFY:

// 1. Every button does something
// 2. Every input affects state/UI
// 3. Forms are functional
// 4. Navigation works
// 5. No dead or useless UI exists

// IF ANY FAILS → FIX BEFORE FINAL OUTPUT

// --------------------------------------------------
// SPA REQUIREMENTS
// --------------------------------------------------
// - Home
// - About
// - Services
// - Contact
// - Must use JS-based navigation

// --------------------------------------------------
// FINAL OUTPUT FORMAT (STRICT)
// --------------------------------------------------
// {
//   "message": "Short professional confirmation sentence",
//   "code": "<FULL VALID HTML>"
// }

// --------------------------------------------------
// ABSOLUTE RULES
// --------------------------------------------------
// - RETURN RAW JSON ONLY
// - NO markdown
// - NO explanation
// - NO extra text
// - MUST BE FULLY FUNCTIONAL WEBSITE
// - IF NOT FUNCTIONAL → RESPONSE IS INVALID
// `;


export const generateWebsite = async(req, res)=>{
    try{
        const {prompt} = req.body
        if(!prompt){
            return res.status(400).json({message:"prompt is required"})
        }
        const user = await User.findById(req.user._id)
        if(!user){
            return res.status(400).json({message:"user not found"})
        }
        if(user.credits < 50){
          return res.status(400).json({message:"you have not enough credits to generate a website"})
        }
        
        const finalPrompt = masterPrompt.replace("{USER_PROMPT}",prompt)
        let raw=""
        let parsed=null
        for(let i=0; i<2 && !parsed; i++){
            raw = await generateResponse(finalPrompt)
            parsed = await extractJson(raw)
            if(!parsed){
                raw = await generateResponse(finalPrompt + "\n\nRETURN ONLY RAW JSON.")
                parsed = await extractJson(raw)
            }
        }
            if(!parsed || !parsed.code){
              console.log("ai returned invalid response",raw)
              return res.status(400).json({message:"ai returned invalid response"})
            }

        // let raw = await generateResponse(finalPrompt);
        // raw = raw
        //   .replace(/```html/gi, "")
        //   .replace(/```/g, "")
        //   .trim();
        // raw = String(raw)
        //   .replace(/```html/gi, "")
        //   .replace(/```/g, "")
        //   .trim();

        if (!parsed.code || !parsed.code.includes("<!DOCTYPE html")) {
          console.log("AI returned invalid HTML");

          return res.status(400).json({
            message: "AI returned invalid HTML"
          });
        }
        // if (
        //   !raw ||
        //   (
        //     !raw.toLowerCase().includes("<!doctype html") &&
        //     !raw.toLowerCase().includes("<html")
        //   )
        // ) {

        //   console.log("INVALID AI RESPONSE:");
        //   console.log(raw);

        //   return res.status(400).json({
        //     message: "AI returned invalid HTML"
        //   });
        // }

            const slug = prompt
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-|-$/g, "") + "-" + Date.now();

            const website = await Website.create({
              user:user._id,
              slug: slug,
              title:prompt.slice(0,60),
              latestCode:parsed.code,
              conversation:[
                {
                role:"user",
                content:prompt
              },
              {
                role:"ai",
                content:"Website generated successfully"
              }
              ]
            })

            user.credits = user.credits-50
            await user.save()

            return res.status(201).json({
              websiteId: website._id,
              code: parsed.code,
              remainingCredits: user.credits
            })
    }catch(error){
      console.log("geneate website",error)
      return res.status(500).json({message:`generate website error ${error}`})
    }
}



export const getWebsiteById = async(req, res)=>{
  try{
    const website = await Website.findOne({
    _id:req.params.id,
    user:req.user._id
    })
    if(!website){
      return res.status(400).json({message:"website not found"})
    }
    return res.status(200).json(website)
  }catch(error){
    return res.status(500).json({message:`get website by id error ${error}`})
  }
  }

export const changes = async(req, res)=>{
  try {
    const {prompt} = req.body
        if(!prompt){
            return res.status(400).json({message:"prompt is required"})
        }

        const website = await Website.findOne({
          _id:req.params.id,
          user:req.user._id
        })

        if(!website){
          return res.status(400).json({message:"website not found"})
        }

        const user = await User.findById(req.user._id)
        if(!user){
            return res.status(400).json({message:"user not found"})
        }
        if(user.credits < 25){
          return res.status(400).json({message:"you have not enough credits to generate a website"})
        }

        // const updatePrompt = `
        // UPDATE THIS HTML WEBSITE.
        
        // CURRENT CODE:
        // ${website.latestCode}
        
        // USER REQUEST:
        // ${prompt}
        
        // RETURN RAW JSON ONLY:{
        //   "message":"Short confirmation",
        //   "code":<UPDATE FULL HTML>
        // }`

        const updatePrompt = `
            You are an expert frontend engineer.

            Your task is to MODIFY the existing HTML website.

            IMPORTANT RULES:
            - DO NOT create a new website from scratch
            - PRESERVE existing structure
            - ONLY apply requested changes
            - RETURN COMPLETE UPDATED HTML
            - KEEP all existing functionality working
            - KEEP responsiveness intact
            - KEEP all previous sections unless user asks to remove them

            USER CHANGE REQUEST:
            ${prompt}

            CURRENT HTML:
            ${website.latestCode}

            RETURN ONLY COMPLETE HTML.

            RULES:
            - Return raw HTML only 
            - Do not return JSON
            - Do not return markdown
            - Do not use \`\`\`
            - Start directly with <!DOCTYPE html>
            - Return complete updated HTML document`

        // let raw=""
        // let parsed=null
        // for(let i=0; i<2 && !parsed; i++){
        //   raw = await generateResponse(updatePrompt)
        //   parsed = await extractJson(raw)
        //   if(!parsed){
        //       raw = await generateResponse(updatePrompt + "\n\nRETURN ONLY RAW JSON.")
        //       parsed = await extractJson(raw)
        //   }
        // }
        // if(!parsed || !parsed.code){
        //   console.log("ai returned invalid response",raw)
        //   return res.status(400).json({message:"ai returned invalid response"})
        // }

        let updatedHtml = await generateResponse(updatePrompt);
        updatedHtml = updatedHtml
          .replace(/```html/gi, "")
          .replace(/```/g, "")
          .trim();

        if (!updatedHtml || !updatedHtml.includes("<!DOCTYPE html")) {
          console.log("AI returned invalid HTML");

          return res.status(400).json({
            message: "AI returned invalid HTML"
          });
        }

        website.conversation.push(
          {role:"user",content:prompt},
          {role:"ai",
            // content:parsed.message
            content:"Website updated successfully"
          }
        )

        // website.latestCode=parsed.code
        website.latestCode = updatedHtml

        await website.save()

        user.credits = user.credits-25
        await user.save()

        return res.status(201).json({
          // message:parsed.message,
          // code:parsed.code,
          message:"Website updated successfully",
          code:updatedHtml,
          remainingCredits:user.credits
        })

  } catch (error) {
    console.log("update website",error)
    return res.status(500).json({message:`update website error ${error}`})
  }
}

export const getAll = async(req, res)=>{
  try {
    const websites = await Website.find({user:req.user._id})
    return res.status(200).json(websites)
  } catch (error) {
    console.log("get all website",error)
    return res.status(500).json({message:`get all website error ${error}`})
  }
}

export const deploy = async(req, res)=>{
  try {
    const website = await Website.findOne({
          _id:req.params.id,
          user:req.user._id
        })

    if(!website){
      return res.status(400).json({message:"website not found"})
    }

    if(!website.slug){
      website.slug=website.title.toLowerCase().replace(/[^a-z0-9]/g,"").slice(0,60)+website._id.toString().slice(-5)
    }

    website.deployed = true
    website.deployUrl = `${process.env.FRONTEND_URL}/site/${website.slug}`
    await website.save()

    return res.status(200).json({
      url:website.deployUrl
    })

  } catch (error) {
    console.log("deploy error",error)
    return res.status(500).json({message:`deploy website error ${error}`})
  }
}

export const getBySlug = async(req, res)=>{
  try {
    const website = await Website.findOne({
          slug:req.params.slug,
          user:req.user._id
        })

    if(!website){
      return res.status(400).json({message:"website not found"})
    }
    return res.status(200).json(website)
  } catch (error) {
    return res.status(500).json({message:`get by slug website error ${error}`})
  }
}