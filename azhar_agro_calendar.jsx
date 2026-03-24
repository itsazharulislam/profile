import { useState } from "react";

const phases = [
  { name: "Brooding Phase", days: [1,7], color: "#FF6B35", emoji: "🐣", desc: "Chick arrival & early care" },
  { name: "Starter Phase", days: [8,14], color: "#F7C59F", emoji: "🐤", desc: "Rapid early growth" },
  { name: "Grower Phase", days: [15,25], color: "#4CAF50", emoji: "🐔", desc: "Visible growth & health checks" },
  { name: "Finisher Phase", days: [26,35], color: "#2196F3", emoji: "🏆", desc: "Final growth & sale prep" },
];

const calendar = [
  // ---- BROODING PHASE ----
  { day: 1, topic: "Chick Arrival Day! 🐣", shot: "Overhead top-down shot of chicks being unloaded from boxes onto litter. Then close-up of tiny chick feet on bedding. End with wide shot of full shed glowing warm under brooder lamp.", lighting: "Brooder lamp orange glow only — do NOT open shed door. This warm glow looks cinematic naturally.", format: "30-sec Reel, Vertical 9:16", caption: "আজ আমাদের নতুন ব্যাচ এসেছে! 🐣🔥 মোট [সংখ্যা] টি বাচ্চা। আল্লাহর রহমতে সব সুস্থ। দোয়া করবেন! #AzharAgro #মুরগিপালন #broiler", editing: "Warm golden color grade (lift shadows to orange). Add text: 'Batch শুরু হলো আজ! Day 1 ✅'. Use upbeat Bengali folk/dhol music intro. Slow-mo on the first chick stepping onto litter.", hook: "আপনি কত বাচ্চা দিয়ে ব্যাচ শুরু করেছেন? Comment করুন! 👇", viral: false },
  { day: 2, topic: "First Feed & Water Setup", shot: "Close-up macro of tiny chicks pecking at feed. Then slow-pan showing drinkers and feeders lined up. Capture one chick drinking water with beak tilted up.", lighting: "Brooder lamp + crack open one side slightly for soft fill light on feeders.", format: "20-sec Reel, Vertical 9:16", caption: "Day 2 — খাবার ও পানির ব্যবস্থা ঠিক আছে! 💧🌾 সুস্থ বাচ্চারা ভালো খাচ্ছে। #AzharAgro #পোল্ট্রি #broilerfarming", editing: "Split screen: left = feeder close-up, right = drinker close-up. Text overlay: 'Feed ✅ Water ✅'. Soft background music.", hook: "প্রথম দিন বাচ্চাদের কত গ্রাম খাবার দেন? নিচে জানান! 👇", viral: false },
  { day: 3, topic: "Brooder Temperature Check", shot: "Show thermometer reading in frame with chicks clustering under lamp behind it. Then show chicks spreading out (sign of correct temp). Hand-held walking shot through shed.", lighting: "Brooder lamp only. Get close so lamp glow fills the frame.", format: "25-sec Reel", caption: "Day 3 — তাপমাত্রা সঠিক রাখা খুব জরুরি! 🌡️🔥 বাচ্চারা সুন্দরভাবে ছড়িয়ে আছে — এটাই সুস্থতার লক্ষণ। #AzharAgro #broiler", editing: "Circle/highlight the thermometer reading with animation. Text: 'আদর্শ তাপমাত্রা: 32–33°C'. Zoom transition from wide shot to thermometer close-up.", hook: "আপনি কিভাবে তাপমাত্রা মেইনটেইন করেন? Gas brooder না Electric? Comment করুন!", viral: false },
  { day: 4, topic: "Litter Condition Check", shot: "Low-angle ground-level shot showing litter texture with chicks walking over it. Pick up a handful of litter and show in hand to camera. Show dry vs wet area difference if any.", lighting: "Open one shed door slightly — morning light gives natural look.", format: "Photo post + 15-sec Reel", caption: "Day 4 — লিটার শুকনো ও পরিষ্কার রাখাই সুস্থ মুরগির চাবিকাঠি! 🌾✅ #AzharAgro #লিটার_ব্যবস্থাপনা", editing: "Side-by-side: Good litter vs Bad litter (from online reference). Circle bad spots with red annotation. Add text tips in Bengali.", hook: "আপনি কোন লিটার ব্যবহার করেন — ধানের তুষ না কাঠের গুঁড়া? 👇", viral: false },
  { day: 5, topic: "First Vaccination Day 💉", shot: "Close-up of vaccine bottle/vial in hand. Then show eye-drop vaccination being given to one chick. Wide shot of all chicks after vaccination. Show your hands carefully handling chick.", lighting: "Good natural light from open door — you need clear visibility for this.", format: "45-sec Reel (most important video of week 1)", caption: "Day 5 — প্রথম টিকা দেওয়া হলো! 💉✅ সুস্থ মুরগির জন্য সময়মতো টিকা অপরিহার্য। ভ্যাকসিন: [নাম লিখুন] #AzharAgro #vaccination #পোল্ট্রিস্বাস্থ্য", editing: "Text on screen: vaccine name + disease it prevents. Show step-by-step numbered process. Add dramatic music build-up. This is educational — add Bengali text subtitles.", hook: "আপনি কোন কোম্পানির ভ্যাকসিন ব্যবহার করেন? নিচে শেয়ার করুন! 💉", viral: true },
  { day: 6, topic: "Morning Routine Vlog", shot: "Start with your hands opening shed door (POV shot). Wide shot of chicks running toward feeder. Then feeding, checking water, litter — show the whole morning routine in sequence.", lighting: "Morning natural light — shoot between 7–9am for best golden hour glow.", format: "60-sec Reel, Vlog style", caption: "একটি সকালের রুটিন — Azhar Agro-তে প্রতিদিন এভাবেই শুরু হয়! ☀️🐔 #AzharAgro #farmlife #সকালেরকাজ", editing: "Fast cuts (each task 3–5 seconds). Add clock animation showing time (6:30 AM etc). Upbeat background music. Speed ramp on walking shots.", hook: "আপনার মুরগির খামারে সকালে প্রথম কী কাজ করেন? 🌅", viral: false },
  { day: 7, topic: "Week 1 Summary + Weight Check", shot: "Weigh one chick on kitchen scale — show scale reading clearly in frame. Then show 3–4 chicks side by side for comparison. End with wide shot of full shed.", lighting: "Bring scale near shed door for natural light on the reading.", format: "40-sec Reel", caption: "Day 7 — সাত দিনে কতটুকু বড় হলো? ⚖️ আলহামদুলিল্লাহ! ওজন: [X] গ্রাম। টার্গেট পূরণ হয়েছে! #AzharAgro #WeeklyUpdate", editing: "BEFORE/AFTER: Day 1 photo vs Day 7 photo side by side. Animated weight counter on screen. Green tick animation. Add weekly summary stats as text card at end.", hook: "৭ দিনে আপনার বাচ্চার ওজন কত হয়? আমাদের জানান! ⚖️", viral: true },
  // ---- STARTER PHASE ----
  { day: 8, topic: "Feeder Height Adjustment", shot: "Show feeder at wrong height vs correct height with chick reaching it. Demonstrate adjusting the feeder chain/height by hand. Show chicks eating comfortably after adjustment.", lighting: "Shed door open, morning light.", format: "30-sec educational Reel", caption: "Day 8 — ফিডার উচ্চতা ঠিক না থাকলে খাবার নষ্ট হয় ও বাচ্চা কম খায়! 🍽️ এভাবে ঠিক করুন। #AzharAgro #tips", editing: "Draw arrow animation pointing to correct height. Red X on wrong height. Text tips in Bengali. Educational style.", hook: "আপনি কি জানতেন ফিডার উচ্চতা এতটা গুরুত্বপূর্ণ? 🤔", viral: false },
  { day: 9, topic: "Drinking Water Quality Check", shot: "Pour water from drinker into a clear glass — show the clarity. Compare with tap water. Show cleaning of drinker with brush. Chicks drinking after clean water.", lighting: "Near shed door, natural light for water clarity.", format: "25-sec Reel", caption: "Day 9 — পরিষ্কার পানি = সুস্থ মুরগি! 💧 দিনে ২ বার দরকার ড্রিংকার পরিষ্কার করা। #AzharAgro #পোল্ট্রিটিপস", editing: "Slow-mo water pour into glass. Clean vs dirty drinker split screen. Text: 'পানি পরিষ্কার রাখুন — রোগ এড়ান'.", hook: "আপনি দিনে কতবার ড্রিংকার পরিষ্কার করেন? 💧", viral: false },
  { day: 10, topic: "Growth Timelapse Comparison", shot: "Pull out your Day 1 footage. Film same spot in shed today. Place one chick in hand — show how much bigger it is now vs Day 1 size (can use your palm as reference).", lighting: "Consistent light with Day 1 — use brooder lamp glow again.", format: "20-sec Reel, high impact", caption: "Day 1 বনাম Day 10 — কতটা পার্থক্য! 😱🐔 মাত্র ১০ দিনে এই পরিবর্তন! আল্লাহর অপার সৃষ্টি। #AzharAgro #growth", editing: "Wipe transition: Day 1 → Day 10. Zoom in on size difference. Add 'WOW' text animation. This is your most shareable video so far.", hook: "এই পরিবর্তন দেখে অবাক হলেন? Share করুন বন্ধুদের সাথে! 🔁", viral: true },
  { day: 11, topic: "Feed Cost Breakdown", shot: "Show feed bag with brand name. Scoop feed into measuring cup/bowl. Show the calculator or notebook where you track costs. Write cost per kg on paper and show to camera.", lighting: "Outside shed, natural daylight for clear reading of numbers.", format: "35-sec Reel or photo carousel", caption: "Day 11 — প্রতিদিন কত টাকার খাবার লাগছে? 💰 হিসাব রাখা জরুরি! Feed cost: [টাকা]/কেজি #AzharAgro #খরচেরহিসাব", editing: "Animated number counting effect for cost. Table/chart showing daily feed consumption. Green = under budget, Red = over budget visual.", hook: "আপনার এলাকায় ব্রয়লার ফিডের দাম কত এখন? নিচে জানান! 💰", viral: false },
  { day: 12, topic: "Ventilation Check", shot: "Show shed ventilation system — open/close windows or curtains. Show ammonia smell indicator (if you have one) or simply fan operation. Chicks in proper airflow vs stuffy corner.", lighting: "Window open = natural light flood — perfect.", format: "25-sec Reel", caption: "Day 12 — সঠিক বায়ু চলাচল ছাড়া মুরগি সুস্থ থাকবে না! 💨 আমাদের শেডে কিভাবে করি দেখুন। #AzharAgro #ventilation", editing: "Animated airflow arrow graphics. Before/after curtain open. Text tips overlay.", hook: "আপনার শেডে কিভাবে ভেন্টিলেশন করেন? 💨", viral: false },
  { day: 13, topic: "Health Observation Walk", shot: "Walk slowly through shed in one continuous shot. Observe chick behavior — show active chicks, show eating, show resting. Point out any that look lethargic (without alarming).", lighting: "Morning, doors open, natural + lamp.", format: "40-sec continuous walking Reel", caption: "Day 13 — প্রতিদিন এভাবে পর্যবেক্ষণ করি! 👁️ সুস্থ মুরগি চেনার উপায় জানেন? #AzharAgro #healthcheck", editing: "Add text pop-ups: '✅ সক্রিয়', '✅ খাচ্ছে', '⚠️ এটা লক্ষ্য রাখুন'. Slow-mo on individual chick behavior.", hook: "সুস্থ মুরগি চেনার আপনার টিপস কী? Comment করুন! 👇", viral: false },
  { day: 14, topic: "Week 2 Weight Update ⚖️", shot: "Weigh 3 random chicks — show each reading. Show your notebook/register with weight record. Compare with standard weight chart if you have one.", lighting: "Near door for clear scale reading.", format: "45-sec Reel", caption: "Day 14 — দুই সপ্তাহ পার! ⚖️ আলহামদুলিল্লাহ! এই সপ্তাহে ওজন: [X] গ্রাম। #AzharAgro #WeeklyUpdate #ব্রয়লার", editing: "Week 1 vs Week 2 weight comparison bar chart animation. Celebration animation if target met. Motivational Bengali text.", hook: "২ সপ্তাহে আপনার মুরগির ওজন কত হয় সাধারণত? ⚖️", viral: true },
  // ---- GROWER PHASE ----
  { day: 15, topic: "Halfway Point Celebration! 🎉", shot: "Wide dramatic shot of full shed — chicks now visibly bigger. Walk through the shed confidently. End with thumbs up to camera. Show before/after photos.", lighting: "Best lighting of the batch — open all doors, morning shoot.", format: "60-sec Reel, most cinematic of the batch", caption: "আলহামদুলিল্লাহ! অর্ধেক পথ পার! 🎉🐔 Day 15 — এখন পর্যন্ত সব ঠিক আছে। দোয়া রাখবেন। #AzharAgro #Day15 #milestone", editing: "Cinematic color grade (slightly desaturated, filmic). Day 1 to Day 15 montage with music build. Text: 'হাফওয়ে মাইলস্টোন! 🏆'. This is your best video so far.", hook: "এতদূর আসতে পেরেছি আপনাদের দোয়ায়। Share করুন! ❤️", viral: true },
  { day: 16, topic: "Feed Bag Change — Starter to Grower", shot: "Show old starter feed bag next to new grower feed bag. Pour both into separate bowls — compare texture and color. Show chicks eating new feed.", lighting: "Outside shed, daylight for clear bag label shots.", format: "30-sec educational Reel", caption: "Day 16 — খাবার পরিবর্তন! 🌾 Starter থেকে Grower ফিডে যাওয়ার সময় হয়েছে। #AzharAgro #feedmanagement", editing: "Side-by-side feed comparison. Brand name visible. Arrow pointing to key differences. Educational text overlay.", hook: "আপনি কোন ব্র্যান্ডের Grower ফিড ব্যবহার করেন? 🌾", viral: false },
  { day: 17, topic: "Second Vaccination Day 💉", shot: "Same as Day 5 but now chicks are bigger. Show vaccination process clearly. Show vaccine cold chain — how you stored it. End with chicks after vaccination.", lighting: "Good natural light essential.", format: "50-sec educational Reel", caption: "Day 17 — দ্বিতীয় টিকা দেওয়া সম্পন্ন! 💉✅ সময়মতো টিকা দিলে রোগ থেকে বাঁচা যায়। #AzharAgro #vaccination", editing: "Vaccination schedule graphic on screen (Day 5, Day 17, Day 28). Show which disease each vaccine prevents. Professional educational layout.", hook: "টিকার সময়সূচি নিয়ে কোনো প্রশ্ন আছে? Comment করুন! 💉", viral: true },
  { day: 18, topic: "Nighttime Shed Check", shot: "Film after dark — enter shed with phone torch/lamp. Show chicks settled and resting. Capture the warm red glow of night brooder lamp. Peaceful, atmospheric footage.", lighting: "Night + brooder lamp only — most atmospheric footage of the batch!", format: "20-sec atmospheric Reel", caption: "রাত ১১টায় শেড চেক! 🌙 সবাই ঘুমিয়ে পড়েছে আলহামদুলিল্লাহ! একজন খামারির কাজ কখনো শেষ হয় না। #AzharAgro #farmlife", editing: "Dark moody grade — keep the warm orange glow. Slow, peaceful music. No fast cuts. Text: 'রাত ১১:০০ PM — শেষ চেক'.", hook: "আপনি কি রাতেও শেড চেক করেন? 🌙", viral: true },
  { day: 19, topic: "Litter Turning & Shed Cleaning", shot: "Show the litter turning process with rake/tool. Before and after litter texture. Removing wet/caked litter. Adding fresh litter if needed.", lighting: "Daytime, door open.", format: "35-sec Reel", caption: "Day 19 — লিটার উল্টানো না হলে অ্যামোনিয়া গ্যাস তৈরি হয়! ⚠️ মুরগির শ্বাসকষ্ট হতে পারে। এভাবে করুন। #AzharAgro", editing: "Before/after litter shot. Red warning animation for bad litter. Green check for fresh litter. Time-lapse of full cleaning process.", hook: "আপনি কতদিন পর পর লিটার পরিষ্কার করেন? 🧹", viral: false },
  { day: 20, topic: "Cost vs Profit Calculation 💰", shot: "Film your notebook or whiteboard showing running costs. Chick cost + feed cost + medicine + electricity. Calculate expected sale price. Show the math clearly.", lighting: "Good light on notebook — natural daylight.", format: "Photo carousel or 45-sec Reel showing notebook", caption: "Day 20 — এখন পর্যন্ত মোট খরচ কত? 💰 লাভ-লোকসানের হিসাব রাখা জরুরি! #AzharAgro #হিসাব #farming", editing: "Animated calculator graphic. Expense vs expected revenue bar chart. Text: 'Break-even point কবে?' Educational financial layout.", hook: "আপনি কি খামারের হিসাব লিখে রাখেন? কিভাবে করেন? 📝", viral: false },
  { day: 21, topic: "Week 3 Weight + 3-Week Comparison 📊", shot: "Weigh 5 chicks, record each. Film yourself writing in register. Then create a side-by-side photo: Day 1, Day 7, Day 14, Day 21 — massive growth visible.", lighting: "Near shed door.", format: "50-sec Reel with data", caption: "তিন সপ্তাহ! 🎉 Day 21 ওজন: [X] গ্রাম। গ্রোথ চার্ট দেখুন! #AzharAgro #WeeklyUpdate #broiler", editing: "Animated growth chart — bar graph showing Week 1, 2, 3 weights. Celebration confetti animation if on target. Most data-rich post of the batch.", hook: "৩ সপ্তাহে কত ওজন হওয়া উচিত বলে মনে করেন? 📊", viral: true },
  // ---- FINISHER PHASE ----
  { day: 22, topic: "Feeder Upgrade — Pan to Tray Feeder", shot: "Show old feeding setup vs new setup for bigger birds. Demonstrate the change. Chicks (now chickens!) eating from new feeders.", lighting: "Morning, open doors.", format: "25-sec Reel", caption: "Day 22 — বড় হয়ে গেছে, এখন বড় ফিডার দরকার! 🍽️ ফিডার আপগ্রেড করলাম। #AzharAgro", editing: "Split screen old vs new feeder. Simple and clean edit. Upbeat music.", hook: "আপনি কখন ফিডার চেঞ্জ করেন? 🍽️", viral: false },
  { day: 23, topic: "Dramatic Body Transformation", shot: "Hold one fully grown bird carefully in both hands — show the size and weight. Look at camera. Compare to your Day 1 palm-sized chick footage. Pure cinematic gold.", lighting: "Morning light from open door — the best natural light of the whole batch.", format: "30-sec Reel, most dramatic of batch", caption: "Day 1 এর ছোট্ট বাচ্চা থেকে এই পরিবর্তন! 😱🐔 আল্লাহর কুদরত! #AzharAgro #transformation #broiler", editing: "Slow-mo bird in hands. Day 1 photo overlay fade transition. Dramatic music crescendo. End with your smiling face. Most emotional post of batch.", hook: "এই গ্রোথ দেখে কি অবাক হলেন? ❤️ Share করুন!", viral: true },
  { day: 24, topic: "Buyer Inquiry & Market Price Update", shot: "Film yourself on phone talking to buyer (just audio is fine). Show current market price written on notebook. Show your birds and explain why they're good quality.", lighting: "Shed interior, door open.", format: "35-sec Reel", caption: "Day 24 — বাজার দর দেখছি! 📞 আজকের ব্রয়লার মূল্য: [X] টাকা/কেজি। #AzharAgro #marketprice #ব্রয়লারবাজার", editing: "Market price text animated on screen. Phone call graphic. 'Live Price Update' banner style.", hook: "আপনার এলাকায় আজ ব্রয়লারের দাম কত? নিচে জানান! 💰", viral: false },
  { day: 25, topic: "Catching & Handling Practice", shot: "Show the correct way to catch and hold a broiler bird safely without stress. Show wrong vs right method. Bird should be calm in hand.", lighting: "Morning natural light.", format: "30-sec educational Reel", caption: "Day 25 — মুরগি ধরার সঠিক উপায় জানেন? ❌✅ ভুল পদ্ধতিতে ধরলে মুরগি আহত হয় ও মাংস নষ্ট হয়! #AzharAgro #tips", editing: "Red X on wrong method, Green tick on correct. Slow-mo demonstration. Text overlay in Bengali.", hook: "আপনি কিভাবে মুরগি ধরেন? এই পদ্ধতি জানতেন? 🤔", viral: false },
  { day: 26, topic: "Final Weight Check Before Sale 📊", shot: "Systematic weighing session — weigh 10 birds, record each one. Show the average calculation. Compare to Day 1, Day 7, Day 14, Day 21 weights.", lighting: "Outside shed, full daylight for clear readings.", format: "60-sec data-rich Reel", caption: "Day 26 — বিক্রির আগে চূড়ান্ত ওজন! ⚖️ গড় ওজন: [X] কেজি। লক্ষ্যমাত্রা পূরণ হয়েছে! আলহামদুলিল্লাহ! #AzharAgro", editing: "Full growth journey chart — Day 1 to Day 26. Celebration animation. Professional data presentation. This is your most important business post.", hook: "৩৫ দিনে আপনার মুরগির গড় ওজন কত হয়? ⚖️", viral: true },
  { day: 28, topic: "Third Vaccination / Booster", shot: "Repeat vaccination documentation as before. Now birds are large — show size difference while vaccinating. Team effort if you have helper.", lighting: "Natural daylight.", format: "40-sec Reel", caption: "Day 28 — শেষ টিকা দেওয়া হলো! 💉 তিনটি টিকাই সময়মতো সম্পন্ন। আলহামদুলিল্লাহ! #AzharAgro #vaccination", editing: "Show vaccination schedule graphic — all 3 checkboxes now ticked. Completed schedule = professional credibility post.", hook: "আপনি কি তিনটি টিকাই দেন? কোন কোন রোগের জন্য? 💉", viral: false },
  { day: 30, topic: "One Month Milestone! 🎂", shot: "Best video of the entire batch. Wide cinematic shot of full shed. Walk through, big birds everywhere. Hold one bird, look at camera. Day 1 vs Day 30 comparison.", lighting: "Morning golden hour, all doors open.", format: "60-sec CINEMATIC Reel — your best edit of the batch", caption: "এক মাস! 🎂🐔 আলহামদুলিল্লাহ! Day 1 থেকে Day 30 — এই যাত্রা আপনাদের ভালোবাসায়। ধন্যবাদ সবাইকে! ❤️ #AzharAgro #1Month", editing: "Full month montage — best clips from every week. Emotional Bengali background music. Slow-mo finale. Add follower count shoutout. Your BEST edit — spend 2 hours on this.", hook: "এই ১ মাসের যাত্রা কেমন লাগলো? ❤️ Comment করুন!", viral: true },
  { day: 32, topic: "Selling Preparation — Fasting Before Sale", shot: "Show removal of feed trays (birds fast 6–8 hrs before catching). Explain why on camera in Bengali. Show birds still active and healthy.", lighting: "Shed interior.", format: "25-sec educational Reel", caption: "Day 32 — বিক্রির আগে খাবার তুলে নেওয়া কেন জরুরি? 🤔 জেনে রাখুন এই গুরুত্বপূর্ণ তথ্য! #AzharAgro #tips", editing: "Simple educational text overlay. Timer graphic showing fasting hours.", hook: "এই তথ্যটি কি আপনার কাজে আসবে? Share করুন! 🔁", viral: false },
  { day: 33, topic: "Catching Day — Dramatic Final Sale!", shot: "Film the entire catching process — catchers arriving, catching birds, weighing crates, loading onto vehicle. End with empty shed (emotional moment).", lighting: "Dawn/early morning — catching usually happens at night/dawn.", format: "90-sec mini-documentary Reel", caption: "শেষ পর্ব! 🎬 আজ বিক্রি হচ্ছে। মাস ভর পরিশ্রমের ফল। আল্লাহর শুকরিয়া! #AzharAgro #harvestday #ব্রয়লারবিক্রি", editing: "Documentary style. Handheld shaky cam for authenticity. Emotional music. Time-lapse of loading. End on empty shed — powerful visual.", hook: "এই মুহূর্তটা সবসময় আবেগের! আপনিও কি এমন অনুভব করেন? 💭", viral: true },
  { day: 34, topic: "Profit & Loss Final Report 💰", shot: "Film your final calculation notebook or whiteboard. Total revenue vs total cost. Net profit revealed. Your face reaction to the result!", lighting: "Good daylight on notebook.", format: "50-sec Reel — most important business post", caption: "চূড়ান্ত হিসাব! 💰 মোট আয়: [X] টাকা | মোট খরচ: [X] টাকা | নিট লাভ: [X] টাকা। আলহামদুলিল্লাহ! #AzharAgro #profit #farming", editing: "Animated revenue vs cost chart. Profit number zooms in dramatically. Green color for profit. Real numbers = most shared post of entire batch.", hook: "এই ব্যবসা কি আপনার কাছে লাভজনক মনে হয়? আপনার অভিজ্ঞতা শেয়ার করুন! 💰", viral: true },
  { day: 35, topic: "Shed Cleaning & Next Batch Announcement! 🔄", shot: "Show shed completely empty and being cleaned. Disinfection process. Fresh litter going in. End with 'Coming Soon — New Batch!' announcement.", lighting: "Full daylight, doors wide open.", format: "40-sec Reel", caption: "পরিষ্কার, জীবাণুমুক্ত, প্রস্তুত! 🧹✨ নতুন ব্যাচ আসছে শীঘ্রই! Follow করুন আপডেটের জন্য। #AzharAgro #newbatch #nextchapter", editing: "Before (full birds) vs After (empty shed) time-lapse. Exciting 'Coming Soon' title card. Notification bell animation asking to follow.", hook: "পরবর্তী ব্যাচের আপডেট পেতে Page Follow করুন! 🔔", viral: false },
];

const weeklySeriesData = [
  { day: "প্রতি শনিবার", name: "⚖️ Weight Update Saturday", desc: "সাপ্তাহিক ওজন আপডেট — ছবি ও তথ্যসহ। ফলোয়াররা এই পোস্টের জন্য অপেক্ষা করবে।" },
  { day: "প্রতি মঙ্গলবার", name: "💰 Cost Tracker Tuesday", desc: "সাপ্তাহিক খরচের হিসাব — ফিড, মেডিসিন, ইলেকট্রিক আলাদা দেখান।" },
  { day: "প্রতি বৃহস্পতিবার", name: "💡 Tip Thursday", desc: "একটি করে পোল্ট্রি টিপস — শিক্ষামূলক, শেয়ারযোগ্য।" },
  { day: "প্রতি রবিবার", name: "☀️ Morning Routine Sunday", desc: "সকালের রুটিন ভ্লগ — ৬০ সেকেন্ড। খামারের জীবন দেখান।" },
  { day: "প্রতি শুক্রবার", name: "📊 Market Price Friday", desc: "এই সপ্তাহে ব্রয়লারের বাজার দর কত? ফলোয়াররা এটা দেখতে পছন্দ করেন।" },
];

const viralIdeas = [
  { title: "💥 'আমি কত লাভ করলাম?' — Final P&L Reveal", desc: "নির্দিষ্ট সংখ্যা দিয়ে লাভ-লোকসান দেখান। বাংলাদেশে এই ধরনের transparency ভাইরাল হয়। মানুষ real numbers দেখতে চায়।", potential: "৫০,০০০+ views" },
  { title: "🐣 Day 1 vs Day 35 Transformation", desc: "একই জায়গায়, একই আলোতে Day 1 ও Day 35 এর ফুটেজ কাটাকাটি করুন। সাথে emotional Bengali music। Shareable content এটা।", potential: "৩০,০০০+ views" },
  { title: "🌙 'রাত ২টায় শেড চেক' — Authentic Farmer Life", desc: "রাতে উঠে শেড চেক করার authentic footage। কোনো editing দরকার নেই। শুধু real life দেখান। এই authenticity ভাইরাল হয়।", potential: "২০,০০০+ views" },
];

const filmingTips = [
  { icon: "💡", title: "আলো সবচেয়ে বড় সমস্যা", tip: "সকাল ৭–৯টায় শুট করুন। শেডের দরজা খুলে দিলে natural light আসে। রাতের শটে brooder lamp-ই আলো। Extra flash/torch ব্যবহার করলে চোখ ঝলসায় না।" },
  { icon: "🔊", title: "শব্দ নিয়ন্ত্রণ", tip: "বাতাসের শব্দ, পাখার শব্দ record হয়। কথা বললে মাইকের কাছে মুখ নিন। CapCut-এ background noise reduce করুন। Music দিলে অনেক সমস্যা hide হয়।" },
  { icon: "🐔", title: "মুরগির স্ট্রেস কমান", tip: "দ্রুত নড়াচড়া করবেন না। হঠাৎ উজ্জ্বল আলো দেবেন না। শেডে ধীরে প্রবেশ করুন। চিৎকার করবেন না।" },
  { icon: "📱", title: "ফোন স্থিরতা", tip: "হাত কাঁপলে CapCut-এ stabilization দিন। ধীরে হাঁটুন। দুই হাতে ফোন ধরুন। দেয়ালে ফোন ঠেস দিয়ে fixed shot নিন।" },
  { icon: "🧼", title: "বায়োসিকিউরিটি", tip: "শুটিং শেষে হাত-পা ধুয়ে নিন। ফোন ঢেকে রাখুন বা শুটিং করুন। জুতা আলাদা রাখুন। শেডে বাইরের কেউ আনবেন না।" },
];

// ---- HEIGHT GUIDE DATA ----
const feederHeights = [
  { age: "Week 1–2", height: "5–8 cm", ref: "Feeder lip = chick's back", days: "Day 1–14" },
  { age: "Week 3–4", height: "8–12 cm", ref: "Feeder lip = chick's back", days: "Day 15–28" },
  { age: "Week 5–6", height: "12–18 cm", ref: "Feeder lip = chick's back", days: "Day 29–42" },
  { age: "Adult / Finish", height: "18–25 cm", ref: "Feeder lip = bird's back", days: "Day 35+" },
];

const watererHeights = [
  { age: "Week 1–2", height: "3–5 cm", ref: "Lip = chick's chest / crop", days: "Day 1–14" },
  { age: "Week 3–4", height: "6–10 cm", ref: "Lip = chick's chest / crop", days: "Day 15–28" },
  { age: "Week 5–6", height: "10–15 cm", ref: "Lip = chick's chest / crop", days: "Day 29–42" },
  { age: "Adult / Finish", height: "15–20 cm", ref: "Lip = bird's chest / crop", days: "Day 35+" },
];

const comparisonData = [
  { age: "Week 1–2", feeder: "5–8 cm", waterer: "3–5 cm", diff: "~2–3 cm" },
  { age: "Week 3–4", feeder: "8–12 cm", waterer: "6–10 cm", diff: "~2–3 cm" },
  { age: "Week 5–6", feeder: "12–18 cm", waterer: "10–15 cm", diff: "~2–3 cm" },
  { age: "Adult / Finish", feeder: "18–25 cm", waterer: "15–20 cm", diff: "~3–5 cm" },
];

const s = {
  card: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
  },
  cardHeader: (color) => ({
    background: `${color}18`,
    borderBottom: `1px solid ${color}30`,
    padding: "10px 14px",
    display: "flex",
    alignItems: "center",
    gap: 8,
  }),
  cardTitle: (color) => ({
    fontSize: 13,
    fontWeight: 700,
    color: color,
  }),
  table: { width: "100%", borderCollapse: "collapse" },
  th: (color) => ({
    fontSize: 10,
    fontWeight: 700,
    color: color,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    padding: "8px 12px",
    textAlign: "left",
    background: "rgba(0,0,0,0.2)",
    borderBottom: `1px solid rgba(255,255,255,0.06)`,
  }),
  td: { fontSize: 12, color: "#ddd", padding: "10px 12px", borderBottom: "1px solid rgba(255,255,255,0.05)" },
  badge: (color) => ({
    display: "inline-block",
    background: `${color}22`,
    color: color,
    borderRadius: 10,
    padding: "2px 8px",
    fontSize: 11,
    fontWeight: 600,
  }),
};

function HeightsGuide() {
  const [activeSection, setActiveSection] = useState("compare");

  const sections = [
    { id: "compare", label: "📊 Comparison" },
    { id: "feeder", label: "🌾 Feeder" },
    { id: "waterer", label: "💧 Waterer" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

      {/* Intro info box */}
      <div style={{
        background: "rgba(76,175,80,0.1)",
        border: "1px solid rgba(76,175,80,0.3)",
        borderRadius: 12,
        padding: "12px 14px",
        fontSize: 12,
        color: "#a5d6a7",
        lineHeight: 1.7,
      }}>
        📏 ফিডার ও ওয়াটারার সঠিক উচ্চতায় না রাখলে খাবার নষ্ট হয়, পানিতে ময়লা পড়ে এবং মুরগির স্বাস্থ্য ক্ষতিগ্রস্ত হয়। প্রতি ৫–৭ দিনে উচ্চতা পরীক্ষা করুন।
      </div>

      {/* Sub-tabs */}
      <div style={{
        display: "flex",
        background: "rgba(0,0,0,0.3)",
        borderRadius: 10,
        padding: 4,
        gap: 4,
      }}>
        {sections.map(sec => (
          <button
            key={sec.id}
            onClick={() => setActiveSection(sec.id)}
            style={{
              flex: 1,
              padding: "7px 4px",
              background: activeSection === sec.id ? "rgba(76,175,80,0.25)" : "transparent",
              border: activeSection === sec.id ? "1px solid rgba(76,175,80,0.4)" : "1px solid transparent",
              borderRadius: 8,
              color: activeSection === sec.id ? "#4CAF50" : "#888",
              fontSize: 11,
              cursor: "pointer",
              fontWeight: activeSection === sec.id ? 700 : 400,
            }}
          >{sec.label}</button>
        ))}
      </div>

      {/* COMPARISON TABLE */}
      {activeSection === "compare" && (
        <div>
          <div style={s.card}>
            <div style={s.cardHeader("#4CAF50")}>
              <span style={{ fontSize: 14 }}>📊</span>
              <span style={s.cardTitle("#4CAF50")}>Feeder vs Waterer — Side by Side</span>
            </div>
            <table style={s.table}>
              <thead>
                <tr>
                  <th style={s.th("#888")}>Age</th>
                  <th style={s.th("#D4820A")}>🌾 Feeder</th>
                  <th style={s.th("#378ADD")}>💧 Waterer</th>
                  <th style={s.th("#4CAF50")}>Diff</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr key={i}>
                    <td style={s.td}><span style={s.badge("#888")}>{row.age}</span></td>
                    <td style={{ ...s.td, color: "#D4820A", fontWeight: 600 }}>{row.feeder}</td>
                    <td style={{ ...s.td, color: "#378ADD", fontWeight: 600 }}>{row.waterer}</td>
                    <td style={s.td}><span style={s.badge("#4CAF50")}>{row.diff}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Golden rules */}
          <div style={{
            background: "rgba(76,175,80,0.08)",
            border: "1px solid rgba(76,175,80,0.25)",
            borderRadius: 12,
            padding: "12px 14px",
            marginBottom: 12,
          }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#4CAF50", marginBottom: 8 }}>✅ গোল্ডেন রুলস</div>
            <div style={{ fontSize: 12, color: "#ccc", lineHeight: 1.8 }}>
              🌾 <b style={{ color: "#D4820A" }}>Feeder:</b> lip সবসময় মুরগির <b style={{ color: "#fff" }}>পিঠের সমান উচ্চতায়</b><br />
              💧 <b style={{ color: "#378ADD" }}>Waterer:</b> lip সবসময় মুরগির <b style={{ color: "#fff" }}>বুক/crop-এর সমান উচ্চতায়</b><br />
              🔁 প্রতি <b style={{ color: "#fff" }}>৫–৭ দিনে</b> উচ্চতা চেক করুন ও বাড়ান
            </div>
          </div>

          {/* Warning */}
          <div style={{
            background: "rgba(244,67,54,0.08)",
            border: "1px solid rgba(244,67,54,0.25)",
            borderRadius: 12,
            padding: "12px 14px",
          }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#EF5350", marginBottom: 6 }}>⚠️ সতর্কতা</div>
            <div style={{ fontSize: 12, color: "#ccc", lineHeight: 1.8 }}>
              ❌ <b style={{ color: "#fff" }}>অনেক নিচু</b> = মলত্যাগ (droppings) খাবার ও পানিতে পড়ে → রোগের ঝুঁকি<br />
              ❌ <b style={{ color: "#fff" }}>অনেক উঁচু</b> = মুরগিকে গলা টানতে হয় → শক্তির অপচয়, খাবার নষ্ট
            </div>
          </div>
        </div>
      )}

      {/* FEEDER TABLE */}
      {activeSection === "feeder" && (
        <div>
          <div style={s.card}>
            <div style={s.cardHeader("#D4820A")}>
              <span style={{ fontSize: 14 }}>🌾</span>
              <div>
                <div style={s.cardTitle("#D4820A")}>Feeder Height Guide</div>
                <div style={{ fontSize: 10, color: "#888", marginTop: 1 }}>Lip of feeder from floor level</div>
              </div>
            </div>
            <table style={s.table}>
              <thead>
                <tr>
                  <th style={s.th("#888")}>Age</th>
                  <th style={s.th("#D4820A")}>Height</th>
                  <th style={s.th("#888")}>Batch Day</th>
                  <th style={s.th("#888")}>Reference</th>
                </tr>
              </thead>
              <tbody>
                {feederHeights.map((row, i) => (
                  <tr key={i}>
                    <td style={s.td}><span style={s.badge("#D4820A")}>{row.age}</span></td>
                    <td style={{ ...s.td, color: "#D4820A", fontWeight: 700, fontSize: 14 }}>{row.height}</td>
                    <td style={{ ...s.td, color: "#888", fontSize: 11 }}>{row.days}</td>
                    <td style={{ ...s.td, color: "#bbb", fontSize: 11 }}>{row.ref}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{
            background: "rgba(212,130,10,0.08)",
            border: "1px solid rgba(212,130,10,0.25)",
            borderRadius: 12,
            padding: "12px 14px",
            fontSize: 12,
            color: "#ccc",
            lineHeight: 1.8,
          }}>
            <b style={{ color: "#D4820A" }}>মনে রাখুন:</b> মুরগি সমতলে দাঁড়ানো অবস্থায় ফিডারের rim যেন ঠিক পিঠের সমান উচ্চতায় থাকে। মুরগি যদি গলা টেনে খায় — উচ্চতা কমান। মুরগি যদি নিচু হয়ে খায় — উচ্চতা বাড়ান।
          </div>
        </div>
      )}

      {/* WATERER TABLE */}
      {activeSection === "waterer" && (
        <div>
          <div style={s.card}>
            <div style={s.cardHeader("#378ADD")}>
              <span style={{ fontSize: 14 }}>💧</span>
              <div>
                <div style={s.cardTitle("#378ADD")}>Waterer Height Guide</div>
                <div style={{ fontSize: 10, color: "#888", marginTop: 1 }}>Drinking lip from floor level</div>
              </div>
            </div>
            <table style={s.table}>
              <thead>
                <tr>
                  <th style={s.th("#888")}>Age</th>
                  <th style={s.th("#378ADD")}>Height</th>
                  <th style={s.th("#888")}>Batch Day</th>
                  <th style={s.th("#888")}>Reference</th>
                </tr>
              </thead>
              <tbody>
                {watererHeights.map((row, i) => (
                  <tr key={i}>
                    <td style={s.td}><span style={s.badge("#378ADD")}>{row.age}</span></td>
                    <td style={{ ...s.td, color: "#378ADD", fontWeight: 700, fontSize: 14 }}>{row.height}</td>
                    <td style={{ ...s.td, color: "#888", fontSize: 11 }}>{row.days}</td>
                    <td style={{ ...s.td, color: "#bbb", fontSize: 11 }}>{row.ref}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{
            background: "rgba(55,138,221,0.08)",
            border: "1px solid rgba(55,138,221,0.25)",
            borderRadius: 12,
            padding: "12px 14px",
            fontSize: 12,
            color: "#ccc",
            lineHeight: 1.8,
          }}>
            <b style={{ color: "#378ADD" }}>মনে রাখুন:</b> ওয়াটারারের rim মুরগির বুক/crop-এর সমান রাখুন। পাখি পানি পানের সময় মাথা সামান্য উপরে তুলে গিলবে — এটাই স্বাভাবিক ভঙ্গি। দিনে ২ বার ওয়াটারার পরিষ্কার করুন।
          </div>
        </div>
      )}
    </div>
  );
}

export default function AzharAgroCalendar() {
  const [activeDay, setActiveDay] = useState(null);
  const [activeTab, setActiveTab] = useState("calendar");
  const [filterPhase, setFilterPhase] = useState("all");

  const getPhase = (day) => {
    if (day <= 7) return phases[0];
    if (day <= 14) return phases[1];
    if (day <= 25) return phases[2];
    return phases[3];
  };

  const filteredCalendar = filterPhase === "all"
    ? calendar
    : calendar.filter(d => {
        const p = getPhase(d.day);
        return p.name === filterPhase;
      });

  const selectedDay = calendar.find(d => d.day === activeDay);

  const tabs = [
    { id: "calendar", label: "📅 Calendar" },
    { id: "heights", label: "📏 Heights" },
    { id: "weekly", label: "🔄 Weekly" },
    { id: "viral", label: "🔥 Viral" },
    { id: "tips", label: "📷 Tips" },
  ];

  return (
    <div style={{
      fontFamily: "'Segoe UI', sans-serif",
      background: "linear-gradient(135deg, #0f1923 0%, #1a2a1a 50%, #0f1923 100%)",
      minHeight: "100vh",
      color: "#e8f5e9",
      padding: "0 0 40px 0",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1b5e20, #2e7d32, #388e3c)",
        padding: "24px 20px",
        textAlign: "center",
        borderBottom: "3px solid #4CAF50",
        boxShadow: "0 4px 20px rgba(76,175,80,0.3)",
      }}>
        <div style={{ fontSize: 36, marginBottom: 4 }}>🐔</div>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: 1 }}>
          AZHAR AGRO
        </h1>
        <p style={{ margin: "4px 0 0", fontSize: 13, color: "#a5d6a7", fontWeight: 600 }}>
          35-Day Broiler Content Calendar
        </p>
        <div style={{
          display: "inline-block",
          background: "rgba(255,255,255,0.15)",
          borderRadius: 20,
          padding: "4px 14px",
          fontSize: 11,
          color: "#c8e6c9",
          marginTop: 8,
        }}>
          📅 Batch Started: March 21, 2026
        </div>
      </div>

      {/* Phase Legend */}
      <div style={{
        display: "flex",
        gap: 8,
        padding: "12px 16px",
        overflowX: "auto",
        background: "rgba(0,0,0,0.3)",
      }}>
        <button
          onClick={() => setFilterPhase("all")}
          style={{
            background: filterPhase === "all" ? "#4CAF50" : "rgba(255,255,255,0.08)",
            border: "1px solid",
            borderColor: filterPhase === "all" ? "#4CAF50" : "rgba(255,255,255,0.15)",
            borderRadius: 20,
            padding: "5px 14px",
            color: "#fff",
            fontSize: 11,
            cursor: "pointer",
            whiteSpace: "nowrap",
            fontWeight: 600,
          }}
        >All Days</button>
        {phases.map(p => (
          <button
            key={p.name}
            onClick={() => setFilterPhase(filterPhase === p.name ? "all" : p.name)}
            style={{
              background: filterPhase === p.name ? p.color : "rgba(255,255,255,0.08)",
              border: "1px solid",
              borderColor: filterPhase === p.name ? p.color : "rgba(255,255,255,0.15)",
              borderRadius: 20,
              padding: "5px 14px",
              color: "#fff",
              fontSize: 11,
              cursor: "pointer",
              whiteSpace: "nowrap",
              fontWeight: 600,
            }}
          >
            {p.emoji} {p.name} (Day {p.days[0]}–{p.days[1]})
          </button>
        ))}
      </div>

      {/* Tabs */}
      <div style={{
        display: "flex",
        background: "rgba(0,0,0,0.4)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              padding: "10px 4px",
              background: "transparent",
              border: "none",
              borderBottom: activeTab === tab.id ? "2px solid #4CAF50" : "2px solid transparent",
              color: activeTab === tab.id ? "#4CAF50" : "#888",
              fontSize: 10,
              cursor: "pointer",
              fontWeight: activeTab === tab.id ? 700 : 400,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ padding: "16px 14px" }}>

        {/* CALENDAR TAB */}
        {activeTab === "calendar" && (
          <div>
            {activeDay && selectedDay ? (
              <div>
                <button
                  onClick={() => setActiveDay(null)}
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: 20,
                    padding: "6px 14px",
                    color: "#aaa",
                    fontSize: 12,
                    cursor: "pointer",
                    marginBottom: 16,
                  }}
                >← Back to Calendar</button>
                <div style={{
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${getPhase(selectedDay.day).color}40`,
                  borderRadius: 16,
                  overflow: "hidden",
                }}>
                  <div style={{
                    background: `linear-gradient(135deg, ${getPhase(selectedDay.day).color}33, ${getPhase(selectedDay.day).color}11)`,
                    padding: "16px",
                    borderBottom: `1px solid ${getPhase(selectedDay.day).color}30`,
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{
                        background: getPhase(selectedDay.day).color,
                        borderRadius: 12,
                        padding: "6px 14px",
                        fontSize: 18,
                        fontWeight: 900,
                        color: "#fff",
                      }}>
                        Day {selectedDay.day}
                      </div>
                      {selectedDay.viral && (
                        <div style={{
                          background: "linear-gradient(135deg, #FF6B35, #f7c59f)",
                          borderRadius: 12,
                          padding: "4px 10px",
                          fontSize: 10,
                          fontWeight: 700,
                          color: "#fff",
                        }}>🔥 HIGH VIRAL POTENTIAL</div>
                      )}
                    </div>
                    <h2 style={{ margin: "10px 0 0", fontSize: 16, color: "#fff" }}>{selectedDay.topic}</h2>
                  </div>
                  <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 14 }}>
                    {[
                      { label: "🎬 কী শুট করবেন", content: selectedDay.shot, color: "#2196F3" },
                      { label: "💡 আলোর পরামর্শ", content: selectedDay.lighting, color: "#FF9800" },
                      { label: "📱 ভিডিও ফরম্যাট", content: selectedDay.format, color: "#9C27B0" },
                      { label: "✂️ এডিটিং আইডিয়া", content: selectedDay.editing, color: "#4CAF50" },
                      { label: "📝 ক্যাপশন আইডিয়া", content: selectedDay.caption, color: "#F44336", bengali: true },
                      { label: "💬 এনগেজমেন্ট হুক", content: selectedDay.hook, color: "#E91E63" },
                    ].map(item => (
                      <div key={item.label} style={{
                        background: `${item.color}11`,
                        border: `1px solid ${item.color}30`,
                        borderRadius: 12,
                        padding: 12,
                      }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: item.color, marginBottom: 6 }}>{item.label}</div>
                        <div style={{
                          fontSize: 13,
                          color: "#ddd",
                          lineHeight: 1.6,
                          fontFamily: item.bengali ? "'Noto Sans Bengali', sans-serif" : "inherit",
                        }}>
                          {item.content}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {filteredCalendar.map(item => {
                  const phase = getPhase(item.day);
                  return (
                    <button
                      key={item.day}
                      onClick={() => setActiveDay(item.day)}
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: `1px solid ${phase.color}30`,
                        borderLeft: `4px solid ${phase.color}`,
                        borderRadius: 12,
                        padding: "12px 14px",
                        cursor: "pointer",
                        textAlign: "left",
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                      }}
                    >
                      <div style={{
                        background: phase.color,
                        borderRadius: 10,
                        minWidth: 42,
                        height: 42,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 11,
                        fontWeight: 900,
                        color: "#fff",
                      }}>
                        D{item.day}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#e8f5e9" }}>{item.topic}</div>
                        <div style={{ fontSize: 10, color: "#888", marginTop: 2 }}>{phase.name} • {item.format}</div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                        {item.viral && <div style={{ fontSize: 9, background: "#FF6B3522", color: "#FF6B35", borderRadius: 6, padding: "2px 6px", fontWeight: 700 }}>🔥 VIRAL</div>}
                        <div style={{ fontSize: 16, color: "#555" }}>›</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* HEIGHTS TAB */}
        {activeTab === "heights" && <HeightsGuide />}

        {/* WEEKLY SERIES TAB */}
        {activeTab === "weekly" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ background: "rgba(76,175,80,0.1)", border: "1px solid rgba(76,175,80,0.3)", borderRadius: 12, padding: "12px 14px", fontSize: 12, color: "#a5d6a7", lineHeight: 1.6 }}>
              💡 প্রতি সপ্তাহে এই ৫টি সিরিজ চালিয়ে যান। ফলোয়াররা নিয়মিত পোস্টের অপেক্ষায় থাকবে এবং Page engagement বাড়বে!
            </div>
            {weeklySeriesData.map((s, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "14px" }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{s.name}</div>
                <div style={{ fontSize: 11, color: "#FF9800", fontWeight: 600, marginBottom: 8 }}>{s.day}</div>
                <div style={{ fontSize: 12, color: "#bbb", lineHeight: 1.7 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        )}

        {/* VIRAL IDEAS TAB */}
        {activeTab === "viral" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ background: "rgba(255,107,53,0.1)", border: "1px solid rgba(255,107,53,0.3)", borderRadius: 12, padding: "12px 14px", fontSize: 12, color: "#FFCCBC", lineHeight: 1.6 }}>
              🔥 এই ৩টি ভিডিও আপনার Page-কে সবচেয়ে বেশি বাড়াবে। একটু বেশি সময় ও মনোযোগ দিন।
            </div>
            {viralIdeas.map((v, i) => (
              <div key={i} style={{ background: "linear-gradient(135deg, rgba(255,107,53,0.08), rgba(255,107,53,0.02))", border: "1px solid rgba(255,107,53,0.3)", borderRadius: 12, padding: "14px" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 8 }}>{v.title}</div>
                <div style={{ fontSize: 12, color: "#ccc", lineHeight: 1.7, marginBottom: 10 }}>{v.desc}</div>
                <div style={{ display: "inline-block", background: "rgba(255,107,53,0.2)", border: "1px solid rgba(255,107,53,0.4)", borderRadius: 8, padding: "3px 10px", fontSize: 11, color: "#FF6B35", fontWeight: 700 }}>
                  🎯 লক্ষ্যমাত্রা: {v.potential}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* FILMING TIPS TAB */}
        {activeTab === "tips" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ background: "rgba(33,150,243,0.1)", border: "1px solid rgba(33,150,243,0.3)", borderRadius: 12, padding: "12px 14px", fontSize: 12, color: "#BBDEFB", lineHeight: 1.6 }}>
              📷 শুধু স্মার্টফোন দিয়েই প্রফেশনাল কন্টেন্ট বানানো সম্ভব — এই টিপসগুলো মানলে!
            </div>
            {filmingTips.map((t, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "14px" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 6 }}>{t.icon} {t.title}</div>
                <div style={{ fontSize: 12, color: "#bbb", lineHeight: 1.7 }}>{t.tip}</div>
              </div>
            ))}
            <div style={{ background: "linear-gradient(135deg, rgba(156,39,176,0.15), rgba(156,39,176,0.05))", border: "1px solid rgba(156,39,176,0.3)", borderRadius: 12, padding: "14px" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#CE93D8", marginBottom: 10 }}>✂️ Editing Workflow পরামর্শ</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { app: "CapCut", use: "Daily Reels, quick edits, captions, music — প্রতিদিনের কাজ এখানেই করুন" },
                  { app: "DaVinci Resolve", use: "Week 1 Summary, Month Milestone, Final P&L Video — বড় ভিডিওতে ব্যবহার করুন" },
                ].map(e => (
                  <div key={e.app} style={{ background: "rgba(255,255,255,0.05)", borderRadius: 8, padding: "10px 12px" }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#CE93D8" }}>{e.app}</div>
                    <div style={{ fontSize: 11, color: "#bbb", marginTop: 3 }}>{e.use}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
