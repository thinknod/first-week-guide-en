// Written by buddies. Roles only: no names, contact details, or employee numbers.
// A needs_checking answer shows only the "Needs checking" label and the contact role.
window.CONTENT = {
  tasks: [
    { task_id: "d1-01", day: 1, order: 1, title: "Collect your laptop and log in", answer_id: "" },
    { task_id: "d1-02", day: 1, order: 2, title: "Change your groupware password", answer_id: "password" },
    { task_id: "d1-03", day: 1, order: 3, title: "Meet your buddy and team lead", answer_id: "" },
    { task_id: "d2-01", day: 2, order: 1, title: "Apply for the corporate card", answer_id: "corporate-card" },
    { task_id: "d2-02", day: 2, order: 2, title: "Book a meeting room for your 1:1 with your buddy", answer_id: "meeting-room" },
    { task_id: "d3-01", day: 3, order: 1, title: "Read how to request leave", answer_id: "leave" },
    { task_id: "d5-01", day: 5, order: 1, title: "Week review with your buddy", answer_id: "" }
  ],
  // Answers: copied as-is from my_work/qa.md ("2. Grouped questions and answers", week of Oct 20-24).
  // question = the email wording in qa.md; it is searched together with the topic.
  answers: [
    { answer_id: "corporate-card", topic: "Corporate card", question: "Who do I apply to for a corporate card?", keywords: "",
      answer: "Get your team lead's approval, then submit the Business Support request form. Usually three days.",
      wiki_location: "General Affairs > Corporate card", contact_role: "Business Support", status: "confirmed" },
    { answer_id: "meeting-room", topic: "Meeting rooms", question: "How do I book a meeting room?", keywords: "",
      answer: "Groupware > Resource booking > Meeting rooms. 30-minute slots.",
      wiki_location: "General Affairs > Meeting rooms", contact_role: "Business Support", status: "confirmed" },
    { answer_id: "leave", topic: "Leave", question: "Who approves leave requests?", keywords: "",
      answer: "Your team lead. Apply in Groupware > Attendance > Leave request. You can use leave from the month you join.",
      wiki_location: "HR > Leave", contact_role: "HR", status: "confirmed" },
    { answer_id: "travel-expenses", topic: "Travel expenses", question: "Where do I upload travel expense receipts?", keywords: "",
      answer: "File an expense claim with photos of the receipts within one week after the trip.",
      wiki_location: "General Affairs > Travel expenses", contact_role: "Business Support", status: "confirmed" },
    { answer_id: "password", topic: "Password", question: "Where do I change my groupware password?", keywords: "",
      answer: "Groupware home > My info > Password. If you forgot it, use \"Forgot password\" on the login screen.",
      wiki_location: "IT > Password", contact_role: "IT Support", status: "confirmed" },
    { answer_id: "email-signature", topic: "Email signature", question: "Is there a team template for the email signature?", keywords: "",
      answer: "Yes, your buddy has it. Add it in Mail > Settings > Signature.",
      wiki_location: "IT > Mail", contact_role: "Your buddy", status: "confirmed" },
    { answer_id: "printer", topic: "Printer", question: "What do I do if my computer can't find the printer?", keywords: "",
      answer: "Each floor has a different printer name. Tell IT Support the name on the label next to the printer.",
      wiki_location: "IT > Printer", contact_role: "IT Support", status: "confirmed" },
    { answer_id: "attendance", topic: "Attendance", question: "Where do I clock in?", keywords: "",
      answer: "Groupware > Attendance > Clock in.",
      wiki_location: "HR > Attendance", contact_role: "HR", status: "confirmed" },
    { answer_id: "required-training", topic: "Required training", question: "When do I have to finish the required training?", keywords: "",
      answer: "Two courses within your first month. Sign up in the training system.",
      wiki_location: "HR > Required training", contact_role: "HR", status: "confirmed" }
  ]
};
