(function() {
  const knowledge = {
    greetings: ['hello', 'hi', 'hey', 'sup', 'yo', 'good morning', 'good afternoon', 'good evening'],
    appointment: ['book', 'appointment', 'schedule', 'visit', 'see dr', 'see doctor', 'checkup', 'physical', 'exam'],
    newpatient: ['new patient', 'first time', 'first visit', 'new here', 'intake', 'register', 'signup'],
    insurance: ['insurance', 'medicare', 'medicaid', 'aetna', 'blue cross', 'cigna', 'united', 'healthnet', 'kaiser', 'ppo', 'hmo', 'coverage', 'accepted'],
    location: ['where', 'location', 'address', 'office', 'find you', 'directions', 'parking', 'santa clarita', 'valencia', 'castaic'],
    hours: ['hours', 'open', 'available', 'when', 'time', 'schedule', 'weekend', 'sunday', 'closed'],
    services: ['services', 'treatment', 'screening', 'echocardiogram', 'ecg', 'ekg', 'blood pressure', 'diabetes', 'hypertension', 'heart', 'kidney', 'gi', 'respiratory', 'asthma', 'copd', 'telemedicine', 'virtual', 'zoom', 'remote monitoring', 'nutrition', 'diet', 'pain', 'mens health'],
    telemedicine: ['telemedicine', 'virtual visit', 'zoom', 'phone call', 'remote', 'online', 'video'],
    superior: ['superior care', 'superior care plus', 'elite plus', 'membership', 'concierge', 'premium', 'priority'],
    contact: ['phone', 'call', 'email', 'reach', 'contact', 'talk to', 'speak with', 'fax'],
    emergency: ['emergency', 'urgent', '911', 'chest pain', 'heart attack', 'stroke', 'severe', 'bleeding', 'unconscious'],
    drlall: ['dr lall', 'doctor lall', 'ashok', 'physician', 'md', 'experience', 'background', 'chief resident', 'henry mayo'],
    pricing: ['price', 'cost', 'fee', 'how much', 'rate', 'charge', 'copay', 'self pay', 'cash'],
    prescription: ['prescription', 'refill', 'medication', 'medicine', 'drug', 'pharmacy', 'rx']
  };

  const responses = {
    greeting: "Hello! I'm the RMS Healthcare assistant. I can help you book an appointment, learn about our services, or answer questions about Dr. Lall and our practice. What can I do for you?",
    appointment: "We'd be happy to see you! You can call us at <strong>(661) 254-6600</strong> to schedule, or fill out the contact form at the bottom of this page. We offer same-day appointments for urgent needs when available. <a href='#contact'>Go to Contact Form →</a>",
    newpatient: "Welcome! New patients should download and complete our <a href='Intake-form-download.pdf' target='_blank'>Patient Intake Form</a> before your first visit. Bring your photo ID, insurance card, and a list of current medications. We do not collect SSN or driver's license numbers online — call us at <strong>(661) 254-6600</strong> for ID verification.",
    insurance: "We accept most major insurance plans including Medicare. For specific plan verification, please call our office at <strong>(661) 254-6600</strong> or email <strong>misscerydp@yahoo.com</strong>. We'll confirm your coverage before your visit.",
    location: "RMS Healthcare Inc. is located in Santa Clarita Valley, CA. We serve patients throughout the Santa Clarita, Valencia, and Castaic areas. For exact address and parking details, please call <strong>(661) 254-6600</strong>.",
    hours: "Our office hours are Monday–Friday. For specific scheduling, please call <strong>(661) 254-6600</strong>. We also offer telemedicine appointments for follow-ups and consultations.",
    services: "We provide comprehensive internal medicine including preventive screenings, heart health, diabetes & hypertension management, respiratory care, GI health, kidney health, men's health, chronic pain care, nutrition counseling, remote patient monitoring, and telemedicine. <a href='#services'>See All Services →</a>",
    telemedicine: "We offer virtual visits via Zoom or telephone for follow-ups, medication reviews, and consultations. Telemedicine is convenient and covered by most insurance plans. Call <strong>(661) 254-6600</strong> to schedule a virtual visit. <a href='#services'>Learn More →</a>",
    superior: "Our <strong>Superior Care</strong> programs offer enhanced access:<br>• <strong>Superior Care</strong> — Advanced preventive screenings<br>• <strong>Superior Care Plus</strong> — 24/7 access, priority appointments<br>• <strong>Superior Care Elite Plus</strong> — Home visits + highest personalization<br>Call <strong>(661) 254-6600</strong> to learn more.",
    contact: "You can reach us at:<br>• Phone: <strong>(661) 254-6600</strong><br>• Email: <strong>misscerydp@yahoo.com</strong><br>• Or use the contact form below. <a href='#contact'>Open Contact Form →</a>",
    emergency: "<div style='background:#fef2f2;border:1px solid #fecaca;border-radius:12px;padding:12px;margin-top:8px;font-size:12px;color:#991b1b'><strong style='display:block;margin-bottom:4px;font-size:13px'>🚨 Medical Emergency</strong>If you are experiencing a life-threatening emergency (chest pain, difficulty breathing, severe bleeding, signs of stroke), call <strong>911</strong> or go to the nearest emergency room immediately.<br><br>For urgent but non-life-threatening concerns, call <strong>(661) 254-6600</strong>.</div>",
    drlall: "Dr. Ashok Lall, MD is an internal medicine specialist with 25+ years of experience. He completed his residency at Saginaw Cooperative Hospitals and served as Chief Resident at Jewish Hospital in Cincinnati. He has been caring for patients in Santa Clarita since 1997 and is on staff at Henry Mayo Newhall Memorial Hospital. <a href='#about'>Read More →</a>",
    pricing: "Costs vary by service and insurance coverage. We accept most major insurance plans and Medicare. For self-pay rates or specific cost questions, please call <strong>(661) 254-6600</strong>. We'll provide a clear estimate before any procedure.",
    prescription: "For prescription refills, please call our office at <strong>(661) 254-6600</strong> during business hours. We require 24–48 hours for refill requests. For urgent medication needs, contact us immediately.",
    fallback: "I'm not sure I caught that. I can help with: booking appointments, new patient info, insurance questions, our services, telemedicine, or Dr. Lall's background. What would you like to know?"
  };

  const quickActions = [
    { label: "🏥 Book Appointment", intent: "appointment" },
    { label: "📋 New Patient Info", intent: "newpatient" },
    { label: "💳 Insurance", intent: "insurance" },
    { label: "📍 Location & Hours", intent: "location" },
    { label: "📞 Contact Info", intent: "contact" },
    { label: "🚨 Emergency", intent: "emergency" }
  ];

  let isOpen = false;
  let hasGreeted = false;

  function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      #rms-chat-btn {
        position: fixed;
        bottom: 24px;
        right: 24px;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: #14588C;
        color: white;
        border: none;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(20,88,140,0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 50;
        transition: transform 0.2s, box-shadow 0.2s;
      }
      #rms-chat-btn:hover { transform: scale(1.05); box-shadow: 0 6px 28px rgba(20,88,140,0.5); }
      #rms-chat-btn svg { width: 28px; height: 28px; }
      #rms-chat-btn .close-icon { display: none; }
      #rms-chat-btn.open .chat-icon { display: none; }
      #rms-chat-btn.open .close-icon { display: block; }

      #rms-chat-panel {
        position: fixed;
        bottom: 92px;
        right: 24px;
        width: 360px;
        max-width: calc(100vw - 48px);
        height: 520px;
        max-height: calc(100vh - 120px);
        background: white;
        border: 1px solid #E3EAF1;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(14,46,78,0.15);
        display: none;
        flex-direction: column;
        z-index: 50;
        overflow: hidden;
        font-family: "Inter", -apple-system, "Segoe UI", sans-serif;
      }
      #rms-chat-panel.open { display: flex; }

      .rms-chat-header {
        background: #0E2E4E;
        color: white;
        padding: 16px 20px;
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .rms-chat-header h3 {
        font-weight: 700;
        font-size: 16px;
        margin: 0;
      }
      .rms-chat-header p {
        font-size: 12px;
        opacity: 0.9;
        margin: 2px 0 0;
      }
      .rms-chat-header .status-dot {
        width: 8px;
        height: 8px;
        background: #4ade80;
        border-radius: 50%;
        box-shadow: 0 0 0 2px rgba(74,222,128,0.3);
        animation: rms-pulse 2s infinite;
      }
      @keyframes rms-pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }

      .rms-chat-messages {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        scroll-behavior: smooth;
      }
      .rms-chat-messages::-webkit-scrollbar { width: 6px; }
      .rms-chat-messages::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }

      .rms-msg {
        max-width: 85%;
        padding: 10px 14px;
        border-radius: 16px;
        font-size: 13px;
        line-height: 1.5;
        animation: rms-fade-in 0.3s ease;
      }
      @keyframes rms-fade-in {
        from { opacity: 0; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .rms-msg.user {
        align-self: flex-end;
        background: #14588C;
        color: white;
        border-bottom-right-radius: 4px;
      }
      .rms-msg.bot {
        align-self: flex-start;
        background: #F3F7FB;
        color: #1e293b;
        border-bottom-left-radius: 4px;
      }
      .rms-msg.bot a {
        color: #14588C;
        text-decoration: underline;
        font-weight: 600;
      }
      .rms-msg.bot .quick-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-top: 10px;
      }
      .rms-msg.bot .quick-actions button {
        background: white;
        border: 1px solid #E3EAF1;
        border-radius: 20px;
        padding: 6px 14px;
        font-size: 12px;
        color: #475569;
        cursor: pointer;
        transition: all 0.15s;
        font-family: "Inter", sans-serif;
      }
      .rms-msg.bot .quick-actions button:hover {
        border-color: #14588C;
        color: #0E2E4E;
        background: #E3EFF8;
      }

      .rms-typing {
        display: flex;
        gap: 4px;
        padding: 12px 14px;
        align-self: flex-start;
      }
      .rms-typing span {
        width: 8px;
        height: 8px;
        background: #cbd5e1;
        border-radius: 50%;
        animation: rms-bounce 1.4s infinite ease-in-out both;
      }
      .rms-typing span:nth-child(1) { animation-delay: -0.32s; }
      .rms-typing span:nth-child(2) { animation-delay: -0.16s; }
      @keyframes rms-bounce {
        0%, 80%, 100% { transform: scale(0); }
        40% { transform: scale(1); }
      }

      .rms-chat-input {
        display: flex;
        gap: 8px;
        padding: 12px 16px;
        border-top: 1px solid #E3EAF1;
        background: #F8FAFC;
      }
      .rms-chat-input input {
        flex: 1;
        border: 1px solid #E3EAF1;
        border-radius: 12px;
        padding: 10px 14px;
        font-size: 13px;
        font-family: "Inter", sans-serif;
        outline: none;
        background: white;
      }
      .rms-chat-input input:focus { border-color: #14588C; }
      .rms-chat-input button {
        background: #14588C;
        color: white;
        border: none;
        border-radius: 12px;
        padding: 10px 16px;
        font-size: 13px;
        font-weight: 700;
        cursor: pointer;
        transition: background 0.15s;
        font-family: "Inter", sans-serif;
      }
      .rms-chat-input button:hover { background: #0E2E4E; }
    `;
    document.head.appendChild(style);
  }

  function injectHTML() {
    const panel = document.createElement('div');
    panel.id = 'rms-chat-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'RMS Healthcare Assistant');
    panel.setAttribute('aria-hidden', 'true');
    panel.innerHTML = `
      <div class="rms-chat-header">
        <div class="status-dot"></div>
        <div>
          <h3>RMS Healthcare</h3>
          <p>Assistant — typically replies instantly</p>
        </div>
      </div>
      <div class="rms-chat-messages" id="rms-messages"></div>
      <div class="rms-chat-input">
        <input type="text" id="rms-input" placeholder="Ask about appointments, services, insurance..." aria-label="Type your message">
        <button id="rms-send-btn">Send</button>
      </div>
    `;
    document.body.appendChild(panel);

    const btn = document.createElement('button');
    btn.id = 'rms-chat-btn';
    btn.setAttribute('aria-label', 'Open chat assistant');
    btn.innerHTML = `
      <svg class="chat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
      <svg class="close-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
    `;
    document.body.appendChild(btn);
  }

  function rmsToggle() {
    isOpen = !isOpen;
    const panel = document.getElementById('rms-chat-panel');
    const btn = document.getElementById('rms-chat-btn');
    panel.classList.toggle('open', isOpen);
    panel.setAttribute('aria-hidden', !isOpen);
    btn.classList.toggle('open', isOpen);
    btn.setAttribute('aria-label', isOpen ? 'Close chat assistant' : 'Open chat assistant');
    if (isOpen && !hasGreeted) {
      hasGreeted = true;
      setTimeout(() => rmsBotMessage(responses.greeting, true), 400);
    }
    if (isOpen) document.getElementById('rms-input').focus();
  }

  function rmsSend() {
    const input = document.getElementById('rms-input');
    const text = input.value.trim();
    if (!text) return;
    rmsUserMessage(text);
    input.value = '';
    rmsThink(text);
  }

  function rmsUserMessage(text) {
    const container = document.getElementById('rms-messages');
    const div = document.createElement('div');
    div.className = 'rms-msg user';
    div.textContent = text;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
  }

  function rmsBotMessage(html, showActions) {
    const container = document.getElementById('rms-messages');
    const div = document.createElement('div');
    div.className = 'rms-msg bot';
    div.innerHTML = html;
    if (showActions) {
      const actions = document.createElement('div');
      actions.className = 'quick-actions';
      quickActions.forEach(a => {
        const btn = document.createElement('button');
        btn.textContent = a.label;
        btn.onclick = () => {
          rmsUserMessage(a.label);
          rmsThink(a.label, true);
        };
        actions.appendChild(btn);
      });
      div.appendChild(actions);
    }
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
  }

  function rmsThink(text, skipTyping) {
    const container = document.getElementById('rms-messages');
    const typing = document.createElement('div');
    typing.className = 'rms-typing';
    typing.id = 'rms-typing';
    typing.innerHTML = '<span></span><span></span><span></span>';
    container.appendChild(typing);
    container.scrollTop = container.scrollHeight;

    const delay = skipTyping ? 300 : 600 + Math.random() * 800;
    setTimeout(() => {
      const t = document.getElementById('rms-typing');
      if (t) t.remove();
      const intent = rmsClassify(text.toLowerCase());
      rmsBotMessage(responses[intent] || responses.fallback, false);
    }, delay);
  }

  function rmsClassify(text) {
    for (const [intent, keywords] of Object.entries(knowledge)) {
      if (keywords.some(k => text.includes(k))) return intent;
    }
    return 'fallback';
  }

  function init() {
    injectStyles();
    injectHTML();
    document.getElementById('rms-chat-btn').addEventListener('click', rmsToggle);
    document.getElementById('rms-send-btn').addEventListener('click', rmsSend);
    document.getElementById('rms-input').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') rmsSend();
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && isOpen) rmsToggle();
    });
    document.addEventListener('click', function(e) {
      if (isOpen && !e.target.closest('#rms-chat-panel') && !e.target.closest('#rms-chat-btn')) {
        rmsToggle();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();