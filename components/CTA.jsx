import maruProject from './imgs/Maruproject.png'
import { Button } from "@/components/ui/button"


export default function CTA() {
  return (
    // <section className="py-24 px-40 text-left" id ="project">
    <section className="max-w-2xl mx-auto py-24 px-5 text-left">

      <h2 className="text-3xl font-semibold mb-4">事業内容</h2>
            <p className="text-gray-400 mb-8">
        {/* TODO: Update copy and wire up the button to a form or link */}
      </p>

      {/* <img src={maruProject} alt="Maru Project" className="w-full max-w-xl mx-auto rounded-xl mb-8" /> */}
      <p className="text-gray-400 mb-8">
        {/* TODO: Update copy and wire up the button to a form or link */}
        感情の表現を斬新に、デザインを通じてビジネスの向上へ      </p>
      <a className="px-8 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition" href= "https://camp-fire.jp/projects/923626/preview?token=fe2bwmrp&utm_campaign=cp_po_share_c_msg_projects_show">
        Check it out
      </a>  
    </section>
  )
}
