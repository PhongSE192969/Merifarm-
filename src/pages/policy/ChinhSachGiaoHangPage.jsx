import PolicyHero from '../../components/policy/PolicyHero'
import PolicyLayout from '../../components/policy/PolicyLayout'
import PolicySection from '../../components/policy/PolicySection'
import NeedHelpCTA from '../../components/policy/NeedHelpCTA'
import LegalNote from '../../components/policy/LegalNote'

const TOC = [
  'Phạm vi áp dụng',
  'Phạm vi giao hàng',
  'Thời gian giao hàng',
  'Phí giao hàng',
  'Trách nhiệm của khách hàng khi nhận hàng',
  'Trường hợp khách hàng không nhận hàng',
  'Giao hàng một phần',
  'Rủi ro trong quá trình vận chuyển',
  'Giao hàng cho đại lý, cửa hàng hoặc khách hàng tổ chức',
  'Sự kiện bất khả kháng',
]

function Bullet({ children }) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-dark" />
      <span>{children}</span>
    </li>
  )
}

export default function ChinhSachGiaoHangPage() {
  return (
    <>
      <PolicyHero
        title="Chính sách giao hàng / vận chuyển"
        description="Quy định về phạm vi giao hàng, thời gian giao hàng, phí vận chuyển, kiểm tra hàng hóa và trách nhiệm của các bên trong quá trình giao nhận."
      />

      <PolicyLayout toc={TOC}>
        {/* 1 */}
        <PolicySection id="section-1" number="01" title="Phạm vi áp dụng">
          <p>
            Chính sách này áp dụng đối với việc giao hàng, vận chuyển, nhận hàng và xử lý các vấn
            đề phát sinh trong quá trình giao hàng đối với sản phẩm được đặt mua từ Merifarm.
          </p>
        </PolicySection>

        {/* 2 */}
        <PolicySection id="section-2" number="02" title="Phạm vi giao hàng">
          <p>
            Merifarm hỗ trợ giao hàng theo khu vực, tuyến vận chuyển, điều kiện kho hàng và khả
            năng phục vụ tại từng thời điểm.
          </p>
          <p>
            Việc giao hàng có thể được thực hiện bởi Merifarm, nhân sự được Merifarm chỉ định, đối
            tác vận chuyển, đơn vị giao nhận hoặc nhà xe theo thỏa thuận với khách hàng.
          </p>
          <p>
            Một số khu vực có thể phát sinh giới hạn giao hàng, thời gian giao hàng dài hơn hoặc
            chi phí vận chuyển bổ sung.
          </p>
        </PolicySection>

        {/* 3 */}
        <PolicySection id="section-3" number="03" title="Thời gian giao hàng">
          <p>
            Thời gian giao hàng được Merifarm thông báo cho khách hàng chỉ là thời gian dự kiến,
            có thể thay đổi tùy thuộc vào:
          </p>
          <ul className="mt-2 space-y-1.5">
            <Bullet>Địa chỉ giao hàng.</Bullet>
            <Bullet>Tình trạng kho.</Bullet>
            <Bullet>Quy cách, khối lượng và số lượng hàng hóa.</Bullet>
            <Bullet>Lịch trình của đơn vị vận chuyển.</Bullet>
            <Bullet>Điều kiện thời tiết.</Bullet>
            <Bullet>Tình trạng giao thông.</Bullet>
            <Bullet>
              Yếu tố bất khả kháng hoặc sự kiện ngoài khả năng kiểm soát hợp lý của Merifarm.
            </Bullet>
          </ul>
          <p>
            Merifarm sẽ nỗ lực thông báo cho khách hàng nếu có thay đổi đáng kể về thời gian giao
            hàng.
          </p>
        </PolicySection>

        {/* 4 */}
        <PolicySection id="section-4" number="04" title="Phí giao hàng">
          <p>
            Phí giao hàng được xác định dựa trên khu vực nhận hàng, số lượng, khối lượng, quy cách
            sản phẩm, phương thức vận chuyển và điều kiện giao nhận thực tế.
          </p>
          <p>Phí giao hàng có thể được Merifarm thông báo riêng khi xác nhận đơn hàng.</p>
          <p>
            Trường hợp phát sinh chi phí ngoài dự kiến do khách hàng thay đổi địa chỉ, thay đổi
            thời gian giao hàng, yêu cầu giao hàng đặc biệt, không nhận hàng đúng hẹn hoặc cung
            cấp thông tin không chính xác, khách hàng có thể phải thanh toán các chi phí phát sinh
            tương ứng.
          </p>
        </PolicySection>

        {/* 5 */}
        <PolicySection
          id="section-5"
          number="05"
          title="Trách nhiệm của khách hàng khi nhận hàng"
        >
          <p>Khi nhận hàng, khách hàng có trách nhiệm:</p>
          <ul className="mt-2 space-y-1.5">
            <Bullet>Kiểm tra tên sản phẩm, số lượng, quy cách và tình trạng bao bì.</Bullet>
            <Bullet>
              Kiểm tra dấu hiệu rách, vỡ, ẩm ướt, móp méo nghiêm trọng hoặc bất thường khác nếu
              có.
            </Bullet>
            <Bullet>Đối chiếu thông tin đơn hàng với hàng hóa thực nhận.</Bullet>
            <Bullet>
              Quay video hoặc chụp ảnh nếu phát hiện hàng hóa có dấu hiệu hư hỏng, thiếu hàng hoặc
              sai sản phẩm.
            </Bullet>
            <Bullet>Thông báo ngay cho Merifarm nếu phát sinh vấn đề.</Bullet>
          </ul>
          <p>
            Việc khách hàng ký nhận, xác nhận nhận hàng hoặc thanh toán cho đơn vị vận chuyển có
            thể được xem là khách hàng đã tiếp nhận hàng hóa tại thời điểm giao nhận, trừ trường
            hợp khách hàng có bằng chứng chứng minh lỗi phát sinh trong quá trình vận chuyển hoặc
            giao sai hàng.
          </p>
        </PolicySection>

        {/* 6 */}
        <PolicySection
          id="section-6"
          number="06"
          title="Trường hợp khách hàng không nhận hàng"
        >
          <p>
            Trường hợp khách hàng không nghe máy, cung cấp sai địa chỉ, không có mặt tại địa điểm
            nhận hàng, từ chối nhận hàng không có lý do hợp lệ hoặc yêu cầu giao lại nhiều lần,
            Merifarm có quyền:
          </p>
          <ul className="mt-2 space-y-1.5">
            <Bullet>Tạm giữ đơn hàng.</Bullet>
            <Bullet>Hủy đơn hàng.</Bullet>
            <Bullet>
              Yêu cầu khách hàng thanh toán chi phí vận chuyển, hoàn hàng, lưu kho hoặc chi phí
              phát sinh khác nếu có.
            </Bullet>
            <Bullet>
              Từ chối xử lý các đơn hàng tiếp theo trong trường hợp khách hàng nhiều lần không
              nhận hàng không có lý do chính đáng.
            </Bullet>
          </ul>
        </PolicySection>

        {/* 7 */}
        <PolicySection id="section-7" number="07" title="Giao hàng một phần">
          <p>
            Trong một số trường hợp, Merifarm có thể giao hàng thành nhiều đợt nếu sản phẩm thuộc
            nhiều kho, số lượng lớn, hàng chưa đủ tồn kho hoặc có thỏa thuận với khách hàng.
          </p>
          <p>
            Merifarm sẽ thông báo trước cho khách hàng về việc giao hàng từng phần nếu cần thiết.
          </p>
        </PolicySection>

        {/* 8 */}
        <PolicySection id="section-8" number="08" title="Rủi ro trong quá trình vận chuyển">
          <p>
            Trường hợp hàng hóa được giao bởi đơn vị vận chuyển độc lập, Merifarm sẽ phối hợp với
            khách hàng và đơn vị vận chuyển để xử lý khi có sự cố mất mát, hư hỏng, giao thiếu
            hoặc giao sai.
          </p>
          <p>
            Khách hàng cần cung cấp đầy đủ hình ảnh, video, chứng từ giao nhận và thông tin liên
            quan để Merifarm có cơ sở kiểm tra và xử lý.
          </p>
        </PolicySection>

        {/* 9 */}
        <PolicySection
          id="section-9"
          number="09"
          title="Giao hàng cho đại lý, cửa hàng hoặc khách hàng tổ chức"
        >
          <p>
            Đối với đơn hàng số lượng lớn, đơn hàng đại lý hoặc đơn hàng giao theo lô, các điều
            kiện giao hàng, bốc xếp, thanh toán, thời gian nhận hàng và trách nhiệm hai bên có thể
            được thỏa thuận riêng bằng văn bản, tin nhắn, email, hợp đồng hoặc xác nhận đơn hàng.
          </p>
        </PolicySection>

        {/* 10 */}
        <PolicySection id="section-10" number="10" title="Sự kiện bất khả kháng">
          <p>
            Merifarm không chịu trách nhiệm đối với việc chậm giao hàng hoặc không thể giao hàng
            đúng thời gian dự kiến nếu nguyên nhân xuất phát từ sự kiện bất khả kháng hoặc tình
            huống ngoài khả năng kiểm soát hợp lý, bao gồm nhưng không giới hạn ở thiên tai, dịch
            bệnh, hỏa hoạn, lũ lụt, chiến tranh, đình công, sự cố giao thông, thay đổi quy định
            của cơ quan nhà nước, lỗi của đơn vị vận chuyển hoặc sự kiện khách quan khác.
          </p>
        </PolicySection>
      </PolicyLayout>

      <LegalNote />
      <NeedHelpCTA />
    </>
  )
}
