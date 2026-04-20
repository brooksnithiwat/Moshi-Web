import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../components/LanguageContext";
import { useTheme } from "../components/ThemeContext";
import FireFlyEffect from "../components/FireflyEffect";

const assetImages = import.meta.glob("../assets/**/*.{png,jpg,jpeg,webp,svg}", {
  eager: true,
  import: "default",
});

const sortByPath = ([a], [b]) => a.localeCompare(b);

const getGalleryImages = (folderPath) =>
  Object.entries(assetImages)
    .filter(([path]) => path.includes(`/assets/${folderPath}/`))
    .sort(sortByPath)
    .map(([, src]) => src);

const termGalleries = {
  fullScale: {
    sketch: getGalleryImages("Sketch"),
    roughColor: getGalleryImages("Rough colour"),
    fullColor: getGalleryImages("Full colour"),
    fullCg: getGalleryImages("Full cg"),
  },
  chibi: {
    half: getGalleryImages("Chibi/Half"),
    full: getGalleryImages("Chibi/Full"),
  },
};

const commissionBlocks = {
  TH: {
    fullScale: [
      {
        title: "Rough sketch (200 Baht)",
        description: "เส้นสเก็ตขาวดำแบบไม่เก็บรายละเอียดงาน ระยะเวลาทำงาน 1-3 วัน",
        images: termGalleries.fullScale.sketch,
      },
      {
        title: "Rough Colour (400 Baht)",
        description:
          "เส้นสเก็ตลงสีพื้น เก็บรายละเอียดเล็กน้อย หากต้องการเพิ่มฉากเบลอหรือแสงเงา อาจมีบวกเพิ่มตามความเหมาะสม ระยะเวลาทำงาน 1-5 วัน",
        images: termGalleries.fullScale.roughColor,
      },
      {
        title: "Full Colour (500 Baht)",
        description:
          "ตัดเส้นหรือลงสีแบบเก็บรายละเอียด สามารถกำหนดคอมโพสที่ต้องการได้ (นักวาดอาจต้องพิจารณาก่อนว่าสามารถวาดได้หรือไม่) มีเพิ่มเฉดสี แสงเงา ฉากเบลอง่าย ๆ ตามความเหมาะสม ระยะเวลาทำงาน 1 เดือนหรือเร็วกว่า",
        images: termGalleries.fullScale.fullColor,
      },
      {
        title: "Full Cg (800 Baht)",
        description:
          "ตัดเส้น ลงสีแบบเก็บรายละเอียด สามารถกำหนดคอมโพสได้ มีเพิ่มเฉดสี แสงเงา ฉากแบบเก็บรายละเอียด (นักวาดอาจพิจารณารับเพียงบางฉากเท่านั้น) ระยะเวลาทำงาน 1-3 เดือนหรือเร็วกว่า",
        images: termGalleries.fullScale.fullCg,
      },
    ],
    chibi: [
      {
        title: "Half Body chibi (200 Baht)",
        description: "ตัวอย่างงานชิบิแบบครึ่งตัว",
        images: termGalleries.chibi.half,
      },
      {
        title: "Full Body chibi (250 Baht)",
        description: "ตัวอย่างงานชิบิแบบเต็มตัว",
        images: termGalleries.chibi.full,
      },
    ],
  },
  EN: {
    fullScale: [
      {
        title: "Rough Sketch - 12 USD",
        description: "Black & white sketch, minimal details. Turnaround: 1-3 days.",
        images: termGalleries.fullScale.sketch,
      },
      {
        title: "Rough Color - 25 USD",
        description:
          "Sketch with base colors and light details. Blur background or lighting may cost extra. Turnaround: 1-5 days.",
        images: termGalleries.fullScale.roughColor,
      },
      {
        title: "Full Color - 32 USD",
        description:
          "Clean lineart or detailed coloring. Composition can be requested (subject to artist approval). Includes shading, lighting, and simple blurred background. Turnaround: up to 1 month or faster.",
        images: termGalleries.fullScale.fullColor,
      },
      {
        title: "Full CG - 50 USD",
        description:
          "Clean lineart and fully detailed coloring with custom composition. Detailed shading, lighting, and background. The artist may accept only certain backgrounds. Turnaround: 1-3 months or faster.",
        images: termGalleries.fullScale.fullCg,
      },
    ],
    chibi: [
      {
        title: "Half Body Chibi - 11 USD",
        description: "Half-body chibi samples",
        images: termGalleries.chibi.half,
      },
      {
        title: "Full Body Chibi - 16 USD",
        description: "Full-body chibi samples",
        images: termGalleries.chibi.full,
      },
    ],
  },
};

function SlideIn({ children, delay = 0, className = "" }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(target);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 550ms ease ${delay}ms, transform 550ms ease ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

function CommissionBlocks({ blocks }) {
  if (!blocks || blocks.length === 0) return null;

  return (
    
    <ol className="space-y-6 mt-4">
      {blocks.map((block, index) => (
        <SlideIn key={block.title} delay={index * 90}>
          <li className="rounded-2xl border border-white/15 bg-black/20 p-4">
            <p className="font-semibold text-lg mb-3">
              {index + 1}. {block.title}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-3">
              {block.images.map((src, imageIndex) => (
                <img
                  key={`${block.title}-${imageIndex}`}
                  src={src}
                  alt={`${block.title} sample ${imageIndex + 1}`}
                  className="w-full aspect-square object-cover rounded-xl border border-white/20 shadow-lg"
                  loading="lazy"
                />
              ))}
            </div>
            <p className="text-white/90">{block.description}</p>
          </li>
        </SlideIn>
      ))}
    </ol>
  );
}

export default function Terms() {
  const { lang, toggleLang } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const selectedLang = lang === "EN" ? "EN" : "TH";

  const content = {
    TH: {
      title: "กติกาการจ้าง",
      intro: "กรุณาอ่านเงื่อนไขทั้งหมดก่อนสั่งงาน",
      sections: [
        {
          heading: "1. Term of use",
          items: [
            "เนื่องจากนักวาดมีงานประจำ ทำให้สามารถทำงานได้เพียงวันเสาร์-อาทิตย์ และไม่สามารถรับงานเดดไลน์ 1-2 อาทิตย์ได้ (หากต้องการจะต้องจ่ายค่าเร่ง 200 บาท)",
            "เพิ่มตัวละคร +70% ของสเกล",
            "เชิงพาณิชย์คูณ 2 จากจำนวนยอดรวมทั้งหมด",
            "อาจมีบวกเพิ่มตามรายละเอียดของงาน",
            "รับโอมากาเสะโดยไม่มีค่าใช้จ่ายเพิ่มเติม",
            "แก้งานได้ 3 ครั้งในแต่ละขั้นตอน แก้ครั้งถัดไปบวกเพิ่ม 20 บาทต่อครั้ง",
            "รบกวนแจ้งประเภทงานทุกครั้ง (Personal use, Commercial use) หากพบว่าใช้งานวาดผิดวัตถุประสงค์จะมีค่าปรับ 3 เท่าจากราคาทั้งหมดและทำการ BL",
            "ส่งงานผ่านไดรฟ์ มีอายุ 3 เดือน",
            "มัดจำ หรือชำระเต็มจำนวนก่อนลงคิว",
            "ลูกค้าที่ว่าจ้างในราคา 230 ขึ้นไปครบ 10 งานจะได้รีเควสฟรีจากนักวาด 1 งาน",
          ],
        },
        {
          heading: "2. ประเภทงาน",
          items: [
            "Personal use : งานที่ไม่ก่อให้เกิดรายได้ต่อตัวผู้จ้าง หรือโปรเจคที่ไม่แสวงหากำไร (อนุโลมงาน give away ในบางกรณี)",
            "Commercial use : งานที่ก่อให้เกิดรายได้ทั้งส่วนตัวหรือโปรเจคนั้น ๆ, งานที่ให้แก่บุคคลที่ 3, งาน Fanart Vtuber, ปกนิยาย",
            "การตีมูลค่าว่าเป็นเชิงพาณิชย์หรืองานใช้ส่วนตัวอาจเป็นไปตามที่นักวาดเห็นสมควร",
          ],
        },
        {
          heading: "3. Commission : Full Scale (Bust - Half Body)",
          gallery: "fullScale",
          items: [
            "ลูกค้าเก่ารับส่วนลด 30 บาทในทุกสเกลที่เปิดรับ",
            "Rough sketch (200 Baht) - เส้นสเก็ตขาวดำแบบไม่เก็บรายละเอียดงาน - ระยะเวลาทำงาน 1-3 วัน",
            "Rough Colour (400 Baht) - เส้นสเก็ตลงสีพื้น เก็บรายละเอียดเล็กน้อย หากต้องการเพิ่มฉากเบลอหรือแสงเงา อาจมีบวกเพิ่มตามความเหมาะสม - ระยะเวลาทำงาน 1-5 วัน",
            "Full Colour (500 Baht) - ตัดเส้นหรือลงสีแบบเก็บรายละเอียด สามารถกำหนดคอมโพสที่ต้องการได้ (นักวาดอาจต้องพิจารณาก่อนว่าสามารถวาดได้หรือไม่) มีเพิ่มเฉดสี แสงเงา ฉากเบลอง่าย ๆ ตามความเหมาะสม - ระยะเวลาทำงาน 1 เดือนหรือเร็วกว่า",
            "Full Cg (800 Baht) - ตัดเส้น ลงสีแบบเก็บรายละเอียด สามารถกำหนดคอมโพสได้ มีเพิ่มเฉดสี แสงเงา ฉากแบบเก็บรายละเอียด (นักวาดอาจพิจารณารับเพียงบางฉากเท่านั้น) - ระยะเวลาทำงาน 1-3 เดือนหรือเร็วกว่า",
          ],
        },
        {
          heading: "4. Commission : Chibi",
          gallery: "chibi",
          items: [
            "Half Body chibi (200 Baht)",
            "Full Body chibi (250 Baht)",
          ],
        },
        {
          heading: "5. Free style Commission",
          items: [
            "บรีฟตามใจลูกค้า ไม่กำหนดรูปแบบตายตัว เดี๋ยวนักวาดจัดให้ ในรูปแบบนี้นักวาดจะประเมินราคาตามความเหมาะสม หรือตามงบของลูกค้า",
          ],
        },
      ],
    },
    EN: {
      title: "Terms of Use",
      intro: "Please read all terms before placing an order.",
      sections: [
        {
          heading: "1. Terms of Use",
          items: [
            "The artist has a full-time job and works only on weekends. Deadlines of 1-2 weeks are not accepted unless a rush fee of 7 USD is paid.",
            "Additional character: +70% of the base price",
            "Commercial use: x2 of the total price",
            "Extra charges may apply depending on work details",
            "Omakase is available at no extra cost",
            "Revisions: 3 times per stage; additional revisions cost 2 USD each",
            "Please specify usage type every time (Personal / Commercial). If the artwork is used incorrectly, a penalty of 3x the total price will be charged and the client will be blacklisted.",
            "Files will be delivered via Google Drive and kept for 3 months",
            "Deposit or full payment is required before queuing",
            "Clients who commission 10 works priced at 15 USD or higher will receive 1 free request from the artist",
          ],
        },
        {
          heading: "2. Usage Types",
          items: [
            "Personal Use: Non-profit use or projects that do not generate income (Giveaway projects may be allowed in some cases)",
            "Commercial Use: Any work that generates income (personal or project-based), work for third parties, VTuber fanart, or novel covers",
            "Final judgment on whether a work is personal or commercial use is at the artist's discretion.",
          ],
        },
        {
          heading: "3. Commission: Full Scale (Bust - Half Body)",
          gallery: "fullScale",
          items: [
            "Returning customers receive a 2 USD discount on all available scales.",
            "Rough Sketch - 12 USD - Black & white sketch, minimal details - Turnaround: 1-3 days",
            "Rough Color - 25 USD - Sketch with base colors and light details - Blur background or lighting may cost extra - Turnaround: 1-5 days",
            "Full Color - 32 USD - Clean lineart or detailed coloring - Composition can be requested (subject to artist approval) - Includes shading, lighting, and simple blurred background - Turnaround: Up to 1 month or faster",
            "Full CG - 50 USD - Clean lineart and fully detailed coloring - Custom composition - Detailed shading, lighting, and background - The artist may accept only certain backgrounds - Turnaround: 1-3 months or faster",
          ],
        },
        {
          heading: "4. Commission: Chibi",
          gallery: "chibi",
          items: [
            "Half Body Chibi - 11 USD",
            "Full Body Chibi - 16 USD",
          ],
        },
        {
          heading: "5. Free Style Commission",
          items: [
            "No fixed format",
            "Client provides a brief and the artist designs freely",
            "Price will be estimated based on details or the client's budget",
          ],
        },
      ],
    },
  };

  const text = content[lang] && content[lang].sections.length > 0 ? content[lang] : content.TH;

  return (
    
    <div
      className={`min-h-screen px-6 py-12 flex items-center justify-center text-white relative ${
        isDark
          ? "bg-gradient-to-b from-purple-900 to-black"
          : "bg-gradient-to-b from-yellow-100 to-purple-900"
      }`}
    >
      <FireFlyEffect />

      <div className="fixed top-6 right-6 z-50 flex gap-4 items-center">
        <button
          onClick={toggleLang}
          className="py-1 px-4 rounded-lg border border-gray-800 text-black hover:bg-gray-200 transition hover:text-gray-800"
          aria-label="Toggle language"
        >
          {lang}
        </button>

        <button
          onClick={toggleTheme}
          className={`w-14 h-8 flex items-center rounded-full px-1 transition-colors duration-300 shadow-[0_0_10px_rgba(255,255,255,0.8)] ${
            isDark ? "bg-gray-300" : "bg-yellow-500"
          }`}
          aria-label="Toggle theme"
        >
          <div
            className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${
              isDark ? "translate-x-6" : "translate-x-0"
            }`}
          >
            {isDark ? (
              <svg viewBox="0 0 24 24" fill="black" className="w-4 h-4">
                <path d="M21.752 15.002A9 9 0 1112.998 2.25a7 7 0 108.754 12.752z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="orange" className="w-4 h-4">
                <path d="M12 18a6 6 0 100-12 6 6 0 000 12zm0 4a1 1 0 011-1h0a1 1 0 110 2h0a1 1 0 01-1-1zm0-20a1 1 0 011-1h0a1 1 0 110 2h0a1 1 0 01-1-1zm10 10a1 1 0 01-1 1h0a1 1 0 110-2h0a1 1 0 011 1zM4 12a1 1 0 01-1 1h0a1 1 0 110-2h0a1 1 0 011 1z" />
              </svg>
            )}
          </div>
        </button>
      </div>

      <div className={`w-full max-w-3xl rounded-3xl border p-8 shadow-2xl backdrop-blur-md ${isDark ? "border-white/10 bg-white/5" : "border-white/30 bg-black/25"}`}>
        <h1 className="text-4xl font-bold mb-4">{text.title}</h1>
        <p className="text-white/80 mb-6">{text.intro}</p>

        <div className="space-y-7 text-white/90">
          {text.sections.map((section, index) => (
            <SlideIn key={section.heading} delay={index * 80}>
              <section>
                <h2 className="text-xl font-semibold mb-3">{section.heading}</h2>
                {section.gallery ? (
                  <>
                    {section.gallery === "fullScale" && section.items[0] && (
                      <p className="text-white/85 mb-2">{section.items[0]}</p>
                    )}
                    <CommissionBlocks blocks={commissionBlocks[selectedLang][section.gallery]} />
                  </>
                ) : (
                  <ul className="space-y-2 list-disc pl-6">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            </SlideIn>
          ))}
        </div>
      </div>
    </div>
  );
}