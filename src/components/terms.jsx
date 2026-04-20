import { useLanguage } from "./LanguageContext";

export default function Terms() {
  const { lang } = useLanguage();

  const content = {
    TH: {
      title: "กติกาการจ้าง",
      intro: "กรุณาอ่านกติกาด้านล่างก่อนสั่งงาน",
      items: [
        "กรุณาให้ข้อมูลงานให้ครบถ้วนก่อนเริ่มคิว",
        "หากมีการแก้ไขงานหลังเริ่มทำ อาจมีค่าบริการเพิ่มเติม",
        "ขอสงวนสิทธิ์ในการปฏิเสธงานที่ไม่ตรงกับแนวทางของเรา",
        "หลังชำระเงินแล้วไม่สามารถขอคืนเงินได้ ยกเว้นกรณีที่ตกลงกันไว้เป็นพิเศษ",
      ],
    },
    EN: {
      title: "Terms of Use",
      intro: "Please read the rules before placing an order.",
      items: [
        "Please provide complete project details before starting.",
        "Changes after work has started may require additional charges.",
        "We reserve the right to decline requests outside our workflow.",
        "Payments are non-refundable unless otherwise agreed.",
      ],
    },
  };

  const text = content[lang] || content.TH;

  return (
    <div className="min-h-screen px-6 py-12 flex items-center justify-center bg-gradient-to-b from-black via-purple-950 to-black text-white">
      <div className="w-full max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-md">
        <h1 className="text-4xl font-bold mb-4">{text.title}</h1>
        <p className="text-white/80 mb-6">{text.intro}</p>

        <ul className="space-y-4 list-disc pl-6 text-white/90">
          {text.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}