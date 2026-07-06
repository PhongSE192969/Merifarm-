import PolicyHero from '../../components/policy/PolicyHero'
import PolicyLayout from '../../components/policy/PolicyLayout'
import PolicySection from '../../components/policy/PolicySection'
import NeedHelpCTA from '../../components/policy/NeedHelpCTA'
import LegalNote from '../../components/policy/LegalNote'

const TOC = [
  'Phạm vi áp dụng',
  'Giải thích từ ngữ',
  'Thông tin Merifarm có thể thu thập',
  'Mục đích thu thập và xử lý thông tin',
  'Cơ sở xử lý thông tin cá nhân',
  'Phạm vi sử dụng thông tin',
  'Thời gian lưu trữ thông tin',
  'Những người hoặc tổ chức có thể được tiếp cận thông tin',
  'Nguyên tắc không mua bán dữ liệu cá nhân',
  'Chuyển giao dữ liệu cho bên thứ ba',
  'Quyền của khách hàng đối với thông tin cá nhân',
  'Cách thức thực hiện quyền của khách hàng',
  'Nghĩa vụ của khách hàng',
  'Biện pháp bảo mật',
  'Rủi ro bảo mật',
  'Cookie và công nghệ tương tự',
  'Thông tin trẻ em',
  'Liên kết đến website hoặc nền tảng bên thứ ba',
  'Cập nhật chính sách bảo mật',
  'Cơ chế tiếp nhận và giải quyết khiếu nại',
  'Thông tin liên hệ về bảo mật thông tin cá nhân',
]

function Bullet({ children }) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-dark" />
      <span>{children}</span>
    </li>
  )
}

export default function ChinhSachBaoMatPage() {
  return (
    <>
      <PolicyHero
        title="Chính sách bảo mật thông tin cá nhân khách hàng"
        description="Merifarm cam kết bảo vệ thông tin cá nhân của khách hàng trong quá trình tư vấn, đặt hàng, giao hàng, thanh toán, chăm sóc sau mua và xử lý yêu cầu hỗ trợ."
      />

      <PolicyLayout toc={TOC}>
        {/* 1 */}
        <PolicySection id="section-1" number="01" title="Phạm vi áp dụng">
          <p>
            Chính sách này áp dụng đối với việc Merifarm thu thập, lưu trữ, sử dụng, xử lý, chia
            sẻ và bảo vệ thông tin cá nhân của khách hàng khi khách hàng truy cập website, gửi yêu
            cầu tư vấn, đặt hàng, liên hệ, sử dụng dịch vụ hoặc tương tác với Merifarm thông qua
            các kênh liên hệ chính thức.
          </p>
          <p>
            Chính sách này áp dụng cho khách hàng cá nhân, đại diện hộ kinh doanh, đại diện tổ
            chức, đại lý, nhà phân phối và các cá nhân khác có cung cấp thông tin cho Merifarm.
          </p>
        </PolicySection>

        {/* 2 */}
        <PolicySection id="section-2" number="02" title="Giải thích từ ngữ">
          <p>Trong phạm vi chính sách này:</p>
          <div className="mt-3 space-y-3">
            <div className="rounded-xl border border-soft bg-soft-green px-4 py-3">
              <p className="font-semibold text-primary-dark">
                "Thông tin cá nhân" hoặc "dữ liệu cá nhân"
              </p>
              <p className="mt-1">
                là thông tin dưới dạng ký hiệu, chữ viết, số, hình ảnh, âm thanh hoặc dạng tương
                tự trên môi trường điện tử gắn liền với một cá nhân cụ thể hoặc giúp xác định một
                cá nhân cụ thể.
              </p>
            </div>
            <div className="rounded-xl border border-soft bg-soft-green px-4 py-3">
              <p className="font-semibold text-primary-dark">"Xử lý thông tin cá nhân"</p>
              <p className="mt-1">
                bao gồm một hoặc nhiều hoạt động như thu thập, ghi, phân tích, xác nhận, lưu trữ,
                chỉnh sửa, công khai, kết hợp, truy cập, truy xuất, thu hồi, mã hóa, giải mã, sao
                chép, chia sẻ, truyền đưa, cung cấp, chuyển giao, xóa, hủy hoặc các hoạt động khác
                có liên quan.
              </p>
            </div>
            <div className="rounded-xl border border-soft bg-soft-green px-4 py-3">
              <p className="font-semibold text-primary-dark">"Khách hàng"</p>
              <p className="mt-1">
                là cá nhân hoặc đại diện tổ chức cung cấp thông tin cho Merifarm để tư vấn, đặt
                hàng, mua hàng, giao hàng, thanh toán hoặc sử dụng dịch vụ hỗ trợ.
              </p>
            </div>
          </div>
        </PolicySection>

        {/* 3 */}
        <PolicySection
          id="section-3"
          number="03"
          title="Thông tin Merifarm có thể thu thập"
        >
          <p>
            Tùy từng hoạt động cụ thể, Merifarm có thể thu thập các nhóm thông tin sau:
          </p>
          <div className="mt-3 space-y-4">
            <div>
              <p className="font-semibold text-ink">a. Thông tin định danh và liên hệ:</p>
              <ul className="mt-2 space-y-1.5">
                <Bullet>Họ và tên.</Bullet>
                <Bullet>Số điện thoại.</Bullet>
                <Bullet>Email.</Bullet>
                <Bullet>Địa chỉ giao hàng.</Bullet>
                <Bullet>
                  Tên đơn vị, cửa hàng, đại lý, trang trại hoặc tổ chức nếu khách hàng cung cấp.
                </Bullet>
                <Bullet>
                  Mã số thuế, thông tin xuất hóa đơn nếu khách hàng yêu cầu.
                </Bullet>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-ink">b. Thông tin đơn hàng và giao dịch:</p>
              <ul className="mt-2 space-y-1.5">
                <Bullet>Sản phẩm quan tâm hoặc đã đặt mua.</Bullet>
                <Bullet>Số lượng, quy cách, giá trị đơn hàng.</Bullet>
                <Bullet>Phương thức thanh toán.</Bullet>
                <Bullet>Lịch sử đặt hàng.</Bullet>
                <Bullet>Lịch sử giao hàng.</Bullet>
                <Bullet>Ghi chú đơn hàng.</Bullet>
                <Bullet>Nội dung trao đổi liên quan đến đơn hàng.</Bullet>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-ink">
                c. Thông tin tư vấn nông nghiệp do khách hàng tự nguyện cung cấp:
              </p>
              <ul className="mt-2 space-y-1.5">
                <Bullet>Loại cây trồng.</Bullet>
                <Bullet>Diện tích hoặc số lượng cây.</Bullet>
                <Bullet>Tình trạng cây trồng.</Bullet>
                <Bullet>Tình trạng đất.</Bullet>
                <Bullet>
                  Hình ảnh cây trồng, vườn, đất hoặc sản phẩm nếu khách hàng gửi.
                </Bullet>
                <Bullet>Nhu cầu sử dụng phân bón hoặc mục tiêu canh tác.</Bullet>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-ink">
                d. Thông tin kỹ thuật khi truy cập website:
              </p>
              <ul className="mt-2 space-y-1.5">
                <Bullet>Địa chỉ IP.</Bullet>
                <Bullet>Loại thiết bị.</Bullet>
                <Bullet>Trình duyệt.</Bullet>
                <Bullet>Thời gian truy cập.</Bullet>
                <Bullet>Trang đã xem.</Bullet>
                <Bullet>Cookie hoặc công nghệ tương tự nếu website có sử dụng.</Bullet>
              </ul>
            </div>
          </div>
          <p>
            Merifarm không chủ động yêu cầu khách hàng cung cấp thông tin nhạy cảm không cần thiết
            cho việc tư vấn, đặt hàng, giao hàng hoặc chăm sóc khách hàng.
          </p>
        </PolicySection>

        {/* 4 */}
        <PolicySection
          id="section-4"
          number="04"
          title="Mục đích thu thập và xử lý thông tin"
        >
          <p>
            Merifarm thu thập và xử lý thông tin cá nhân của khách hàng cho các mục đích sau:
          </p>
          <ul className="mt-2 space-y-1.5">
            <Bullet>Tiếp nhận và phản hồi yêu cầu tư vấn.</Bullet>
            <Bullet>Xác nhận, xử lý và quản lý đơn hàng.</Bullet>
            <Bullet>Giao hàng và liên hệ khi giao hàng.</Bullet>
            <Bullet>Xác nhận thanh toán, đối soát giao dịch và lập chứng từ nếu có.</Bullet>
            <Bullet>
              Cung cấp thông tin sản phẩm, hướng dẫn sử dụng tham khảo và chăm sóc sau mua.
            </Bullet>
            <Bullet>Giải quyết yêu cầu đổi trả, hoàn tiền, khiếu nại hoặc tranh chấp.</Bullet>
            <Bullet>Quản lý khách hàng, đại lý, nhà phân phối hoặc đối tác.</Bullet>
            <Bullet>
              Cải thiện chất lượng sản phẩm, dịch vụ, nội dung website và trải nghiệm khách hàng.
            </Bullet>
            <Bullet>
              Gửi thông báo liên quan đến đơn hàng, chính sách dịch vụ hoặc chương trình phù hợp
              nếu khách hàng đồng ý hoặc pháp luật cho phép.
            </Bullet>
            <Bullet>
              Thực hiện nghĩa vụ theo quy định pháp luật hoặc yêu cầu hợp pháp của cơ quan nhà
              nước có thẩm quyền.
            </Bullet>
          </ul>
        </PolicySection>

        {/* 5 */}
        <PolicySection
          id="section-5"
          number="05"
          title="Cơ sở xử lý thông tin cá nhân"
        >
          <p>
            Merifarm xử lý thông tin cá nhân của khách hàng trên cơ sở:
          </p>
          <ul className="mt-2 space-y-1.5">
            <Bullet>
              Khách hàng tự nguyện cung cấp thông tin khi gửi form, đặt hàng, liên hệ hoặc sử dụng
              dịch vụ.
            </Bullet>
            <Bullet>
              Việc xử lý là cần thiết để thực hiện yêu cầu tư vấn, xác nhận đơn hàng, giao hàng,
              thanh toán hoặc chăm sóc khách hàng.
            </Bullet>
            <Bullet>
              Việc xử lý là cần thiết để bảo vệ quyền và lợi ích hợp pháp của Merifarm, khách hàng
              hoặc bên thứ ba có liên quan.
            </Bullet>
            <Bullet>
              Việc xử lý là cần thiết để thực hiện nghĩa vụ theo quy định pháp luật.
            </Bullet>
            <Bullet>Các cơ sở hợp pháp khác theo quy định pháp luật hiện hành.</Bullet>
          </ul>
        </PolicySection>

        {/* 6 */}
        <PolicySection id="section-6" number="06" title="Phạm vi sử dụng thông tin">
          <p>
            Thông tin cá nhân của khách hàng chỉ được sử dụng trong phạm vi phù hợp với mục đích
            đã nêu tại chính sách này hoặc mục đích khác đã được khách hàng đồng ý, trừ trường hợp
            pháp luật có quy định khác.
          </p>
          <p>
            Merifarm không sử dụng thông tin cá nhân của khách hàng cho mục đích trái pháp luật,
            không phù hợp với mục đích thu thập hoặc không được khách hàng biết trong phạm vi pháp
            luật yêu cầu.
          </p>
        </PolicySection>

        {/* 7 */}
        <PolicySection id="section-7" number="07" title="Thời gian lưu trữ thông tin">
          <p>
            Thông tin cá nhân của khách hàng được lưu trữ trong thời gian cần thiết để phục vụ mục
            đích thu thập, xử lý đơn hàng, chăm sóc khách hàng, giải quyết khiếu nại, đối soát
            giao dịch, thực hiện nghĩa vụ kế toán, thuế, lưu trữ chứng từ hoặc nghĩa vụ pháp lý
            khác nếu có.
          </p>
          <p>
            Khi không còn cần thiết hoặc khi khách hàng có yêu cầu hợp lệ, Merifarm sẽ xem xét
            xóa, hủy, ẩn danh hoặc hạn chế xử lý thông tin theo quy định pháp luật và điều kiện
            kỹ thuật thực tế.
          </p>
        </PolicySection>

        {/* 8 */}
        <PolicySection
          id="section-8"
          number="08"
          title="Những người hoặc tổ chức có thể được tiếp cận thông tin"
        >
          <p>
            Merifarm có thể cho phép các cá nhân, bộ phận hoặc tổ chức sau tiếp cận thông tin cá
            nhân trong phạm vi cần thiết:
          </p>
          <ul className="mt-2 space-y-1.5">
            <Bullet>Bộ phận tư vấn và chăm sóc khách hàng.</Bullet>
            <Bullet>Bộ phận xử lý đơn hàng.</Bullet>
            <Bullet>Bộ phận kho vận và giao hàng.</Bullet>
            <Bullet>Bộ phận kế toán hoặc phụ trách chứng từ.</Bullet>
            <Bullet>Đơn vị vận chuyển hoặc nhà xe.</Bullet>
            <Bullet>
              Đơn vị cung cấp dịch vụ kỹ thuật, lưu trữ, vận hành website, phần mềm hoặc hạ tầng
              công nghệ.
            </Bullet>
            <Bullet>
              Đối tác hỗ trợ xử lý đơn hàng hoặc dịch vụ liên quan nếu cần thiết.
            </Bullet>
            <Bullet>Cơ quan nhà nước có thẩm quyền khi có yêu cầu hợp pháp.</Bullet>
          </ul>
          <p>
            Các bên tiếp cận thông tin có trách nhiệm sử dụng thông tin trong phạm vi cần thiết cho
            mục đích đã được xác định và phù hợp với quy định pháp luật.
          </p>
        </PolicySection>

        {/* 9 */}
        <PolicySection
          id="section-9"
          number="09"
          title="Nguyên tắc không mua bán dữ liệu cá nhân"
        >
          <p>
            Merifarm không bán, trao đổi, cho thuê hoặc chuyển giao thông tin cá nhân của khách
            hàng cho bên thứ ba vì mục đích thương mại độc lập khi chưa có căn cứ hợp pháp hoặc sự
            đồng ý phù hợp của khách hàng, trừ trường hợp pháp luật có quy định khác.
          </p>
        </PolicySection>

        {/* 10 */}
        <PolicySection
          id="section-10"
          number="10"
          title="Chuyển giao dữ liệu cho bên thứ ba"
        >
          <p>
            Trong trường hợp cần chia sẻ thông tin cho bên thứ ba để phục vụ giao hàng, thanh
            toán, vận hành website, chăm sóc khách hàng hoặc thực hiện nghĩa vụ pháp lý, Merifarm
            chỉ chia sẻ phạm vi thông tin cần thiết và phù hợp với mục đích xử lý.
          </p>
          <p>Ví dụ:</p>
          <ul className="mt-2 space-y-1.5">
            <Bullet>
              Chia sẻ họ tên, số điện thoại, địa chỉ giao hàng cho đơn vị vận chuyển.
            </Bullet>
            <Bullet>Chia sẻ thông tin đơn hàng cho bộ phận xử lý đơn.</Bullet>
            <Bullet>
              Chia sẻ thông tin kỹ thuật cho đơn vị vận hành website khi cần bảo trì hệ thống.
            </Bullet>
            <Bullet>
              Cung cấp thông tin theo yêu cầu hợp pháp của cơ quan nhà nước có thẩm quyền.
            </Bullet>
          </ul>
        </PolicySection>

        {/* 11 */}
        <PolicySection
          id="section-11"
          number="11"
          title="Quyền của khách hàng đối với thông tin cá nhân"
        >
          <p>
            Trong phạm vi pháp luật cho phép, khách hàng có các quyền liên quan đến thông tin cá
            nhân của mình, bao gồm:
          </p>
          <ul className="mt-2 space-y-1.5">
            <Bullet>Quyền được biết về hoạt động xử lý thông tin cá nhân.</Bullet>
            <Bullet>
              Quyền đồng ý hoặc không đồng ý đối với một số hoạt động xử lý thông tin cá nhân.
            </Bullet>
            <Bullet>
              Quyền truy cập, yêu cầu xem hoặc xác nhận thông tin đã cung cấp.
            </Bullet>
            <Bullet>Quyền yêu cầu chỉnh sửa, cập nhật thông tin không chính xác.</Bullet>
            <Bullet>
              Quyền yêu cầu xóa hoặc hạn chế xử lý thông tin trong trường hợp phù hợp.
            </Bullet>
            <Bullet>
              Quyền rút lại sự đồng ý đối với hoạt động xử lý dựa trên sự đồng ý.
            </Bullet>
            <Bullet>
              Quyền khiếu nại, phản ánh hoặc yêu cầu giải quyết vấn đề liên quan đến thông tin cá
              nhân.
            </Bullet>
            <Bullet>Các quyền khác theo quy định pháp luật hiện hành.</Bullet>
          </ul>
        </PolicySection>

        {/* 12 */}
        <PolicySection
          id="section-12"
          number="12"
          title="Cách thức thực hiện quyền của khách hàng"
        >
          <p>
            Khách hàng có thể gửi yêu cầu liên quan đến thông tin cá nhân qua hotline, email hoặc
            địa chỉ liên hệ chính thức của Merifarm.
          </p>
          <p>
            Yêu cầu cần bao gồm thông tin đủ để Merifarm xác minh danh tính hoặc xác minh tư cách
            của người yêu cầu, nội dung yêu cầu cụ thể và thông tin liên hệ để phản hồi.
          </p>
          <p>Merifarm có thể từ chối xử lý yêu cầu nếu:</p>
          <ul className="mt-2 space-y-1.5">
            <Bullet>Không đủ cơ sở xác minh người yêu cầu.</Bullet>
            <Bullet>Yêu cầu không phù hợp với quy định pháp luật.</Bullet>
            <Bullet>
              Việc thực hiện yêu cầu ảnh hưởng đến quyền, lợi ích hợp pháp của bên thứ ba.
            </Bullet>
            <Bullet>
              Thông tin cần được lưu giữ để thực hiện nghĩa vụ pháp lý, giải quyết tranh chấp,
              khiếu nại hoặc bảo vệ quyền lợi hợp pháp của Merifarm.
            </Bullet>
            <Bullet>Trường hợp khác theo quy định pháp luật.</Bullet>
          </ul>
        </PolicySection>

        {/* 13 */}
        <PolicySection id="section-13" number="13" title="Nghĩa vụ của khách hàng">
          <p>Khách hàng có trách nhiệm:</p>
          <ul className="mt-2 space-y-1.5">
            <Bullet>Cung cấp thông tin trung thực, chính xác và cập nhật.</Bullet>
            <Bullet>
              Không cung cấp thông tin của người khác nếu không có quyền hoặc sự đồng ý hợp pháp.
            </Bullet>
            <Bullet>
              Tự bảo vệ thông tin cá nhân, thông tin đơn hàng và phương tiện liên hệ của mình.
            </Bullet>
            <Bullet>
              Thông báo kịp thời cho Merifarm nếu phát hiện thông tin bị sử dụng sai mục đích hoặc
              có dấu hiệu rủi ro bảo mật.
            </Bullet>
          </ul>
        </PolicySection>

        {/* 14 */}
        <PolicySection id="section-14" number="14" title="Biện pháp bảo mật">
          <p>
            Merifarm áp dụng các biện pháp quản lý và kỹ thuật phù hợp để bảo vệ thông tin cá nhân
            của khách hàng, bao gồm:
          </p>
          <ul className="mt-2 space-y-1.5">
            <Bullet>Hạn chế quyền truy cập thông tin theo nhu cầu công việc.</Bullet>
            <Bullet>Lưu trữ thông tin trong hệ thống hoặc công cụ quản lý phù hợp.</Bullet>
            <Bullet>Kiểm soát việc chia sẻ thông tin cho bên liên quan.</Bullet>
            <Bullet>
              Áp dụng biện pháp phòng ngừa truy cập trái phép, mất mát, lạm dụng, thay đổi hoặc
              tiết lộ thông tin ngoài phạm vi cho phép.
            </Bullet>
            <Bullet>Rà soát và cập nhật quy trình bảo mật khi cần thiết.</Bullet>
          </ul>
        </PolicySection>

        {/* 15 */}
        <PolicySection id="section-15" number="15" title="Rủi ro bảo mật">
          <p>
            Mặc dù Merifarm áp dụng các biện pháp phù hợp để bảo vệ thông tin cá nhân, khách hàng
            hiểu rằng không có hệ thống điện tử, mạng Internet hoặc phương thức truyền dữ liệu nào
            có thể bảo đảm an toàn tuyệt đối.
          </p>
          <p>
            Trong trường hợp phát sinh sự cố có nguy cơ ảnh hưởng đến thông tin cá nhân, Merifarm
            sẽ xem xét áp dụng biện pháp xử lý phù hợp và thông báo theo quy định pháp luật nếu
            thuộc trường hợp phải thông báo.
          </p>
        </PolicySection>

        {/* 16 */}
        <PolicySection id="section-16" number="16" title="Cookie và công nghệ tương tự">
          <p>
            Website Merifarm có thể sử dụng cookie hoặc công nghệ tương tự để ghi nhớ phiên truy
            cập, cải thiện trải nghiệm người dùng, thống kê truy cập, hỗ trợ giỏ hàng hoặc tối ưu
            nội dung.
          </p>
          <p>
            Khách hàng có thể điều chỉnh cài đặt trình duyệt để từ chối hoặc xóa cookie. Tuy
            nhiên, việc tắt cookie có thể ảnh hưởng đến một số tính năng của website.
          </p>
        </PolicySection>

        {/* 17 */}
        <PolicySection id="section-17" number="17" title="Thông tin trẻ em">
          <p>
            Merifarm không chủ động thu thập thông tin cá nhân của trẻ em nếu không cần thiết cho
            hoạt động bán hàng hoặc tư vấn sản phẩm.
          </p>
          <p>
            Trường hợp phát hiện thông tin của trẻ em được cung cấp không phù hợp hoặc không có sự
            đồng ý cần thiết theo quy định pháp luật, Merifarm có thể xóa, hạn chế xử lý hoặc yêu
            cầu bổ sung thông tin xác minh.
          </p>
        </PolicySection>

        {/* 18 */}
        <PolicySection
          id="section-18"
          number="18"
          title="Liên kết đến website hoặc nền tảng bên thứ ba"
        >
          <p>
            Website Merifarm có thể chứa liên kết đến nền tảng bên thứ ba như bản đồ, mạng xã hội,
            đơn vị vận chuyển hoặc công cụ liên hệ.
          </p>
          <p>
            Merifarm không chịu trách nhiệm đối với chính sách bảo mật, nội dung hoặc cách thức xử
            lý thông tin của bên thứ ba. Khách hàng nên đọc kỹ chính sách của các bên đó trước khi
            cung cấp thông tin.
          </p>
        </PolicySection>

        {/* 19 */}
        <PolicySection id="section-19" number="19" title="Cập nhật chính sách bảo mật">
          <p>
            Merifarm có quyền sửa đổi, bổ sung hoặc cập nhật chính sách này để phù hợp với hoạt
            động kinh doanh, yêu cầu quản lý, thay đổi kỹ thuật hoặc quy định pháp luật.
          </p>
          <p>
            Phiên bản cập nhật sẽ được công bố trên website và có hiệu lực kể từ thời điểm được
            đăng tải, trừ khi có thông báo khác.
          </p>
        </PolicySection>

        {/* 20 */}
        <PolicySection
          id="section-20"
          number="20"
          title="Cơ chế tiếp nhận và giải quyết khiếu nại"
        >
          <p>
            Nếu khách hàng cho rằng thông tin cá nhân của mình bị xử lý sai mục đích, bị tiết lộ
            trái phép hoặc có yêu cầu liên quan đến dữ liệu cá nhân, khách hàng có thể liên hệ
            Merifarm.
          </p>
          <p>
            Merifarm sẽ tiếp nhận, kiểm tra và phản hồi trong thời gian hợp lý kể từ khi nhận đủ
            thông tin cần thiết.
          </p>
        </PolicySection>

        {/* 21 */}
        <PolicySection
          id="section-21"
          number="21"
          title="Thông tin liên hệ về bảo mật thông tin cá nhân"
        >
          <div className="rounded-xl border border-soft bg-soft-green p-4">
            <p className="font-semibold text-primary-dark">
              Merifarm – CÔNG TY TRÁCH NHIỆM HỮU HẠN PHÁT TRIỂN KỸ THUẬT TÂM PHÚC
            </p>
            <div className="mt-3 space-y-1.5 text-secondary">
              <p>Hotline: 0982 969 781</p>
              <p>Email: contact.merifarm@gmail.com</p>
              <p>Địa chỉ: Số 5-7 Đường số 32, Phường Bình Phú, TP. Hồ Chí Minh, Việt Nam</p>
            </div>
          </div>
        </PolicySection>
      </PolicyLayout>

      <LegalNote />
      <NeedHelpCTA />
    </>
  )
}
