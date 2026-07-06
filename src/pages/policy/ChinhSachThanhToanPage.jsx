import PolicyHero from '../../components/policy/PolicyHero'
import PolicyLayout from '../../components/policy/PolicyLayout'
import PolicySection from '../../components/policy/PolicySection'
import NeedHelpCTA from '../../components/policy/NeedHelpCTA'
import LegalNote from '../../components/policy/LegalNote'

const TOC = [
  'Phạm vi áp dụng',
  'Nguyên tắc thanh toán',
  'Các hình thức thanh toán',
  'Thanh toán khi nhận hàng',
  'Thanh toán bằng chuyển khoản ngân hàng',
  'Xác nhận thanh toán',
  'Giá bán, phí vận chuyển và chi phí phát sinh',
  'Sai sót trong giá bán hoặc thông tin thanh toán',
  'Chứng từ, hóa đơn',
  'Cảnh báo an toàn thanh toán',
  'Đối soát và khiếu nại thanh toán',
]

function Bullet({ children }) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-dark" />
      <span>{children}</span>
    </li>
  )
}

export default function ChinhSachThanhToanPage() {
  return (
    <>
      <PolicyHero
        title="Chính sách thanh toán"
        description="Quy định về hình thức thanh toán, xác nhận thanh toán, chứng từ giao dịch và các lưu ý an toàn khi thanh toán đơn hàng tại Merifarm."
      />

      <PolicyLayout toc={TOC}>
        {/* 1 */}
        <PolicySection id="section-1" number="01" title="Phạm vi áp dụng">
          <p>
            Chính sách thanh toán này áp dụng cho toàn bộ đơn hàng, yêu cầu đặt hàng, yêu cầu mua
            sản phẩm hoặc giao dịch phát sinh giữa khách hàng và Merifarm thông qua website, điện
            thoại, email, Zalo hoặc các kênh liên hệ chính thức khác được Merifarm công bố.
          </p>
        </PolicySection>

        {/* 2 */}
        <PolicySection id="section-2" number="02" title="Nguyên tắc thanh toán">
          <p>
            Khách hàng có trách nhiệm thanh toán đầy đủ, đúng thời hạn và theo đúng phương thức đã
            được hai bên thống nhất khi xác nhận đơn hàng.
          </p>
          <p>
            Merifarm chỉ xử lý đơn hàng theo phương thức thanh toán đã được xác nhận với khách
            hàng. Trường hợp có thay đổi về phương thức thanh toán, nội dung thay đổi phải được
            Merifarm xác nhận trước khi thực hiện.
          </p>
        </PolicySection>

        {/* 3 */}
        <PolicySection id="section-3" number="03" title="Các hình thức thanh toán">
          <p>
            Tùy từng thời điểm, khu vực giao hàng, giá trị đơn hàng và điều kiện thực tế, Merifarm
            có thể hỗ trợ một hoặc nhiều hình thức thanh toán sau:
          </p>
          <ul className="mt-2 space-y-1.5">
            <Bullet>Thanh toán khi nhận hàng.</Bullet>
            <Bullet>Thanh toán bằng chuyển khoản ngân hàng.</Bullet>
            <Bullet>
              Thanh toán trực tiếp tại địa điểm giao dịch hoặc kho hàng nếu có thỏa thuận.
            </Bullet>
            <Bullet>
              Phương thức thanh toán khác được Merifarm thông báo và xác nhận cụ thể với khách
              hàng.
            </Bullet>
          </ul>
        </PolicySection>

        {/* 4 */}
        <PolicySection id="section-4" number="04" title="Thanh toán khi nhận hàng">
          <p>
            Đối với phương thức thanh toán khi nhận hàng, khách hàng thực hiện thanh toán cho nhân
            viên giao hàng hoặc đơn vị vận chuyển theo số tiền đã được Merifarm xác nhận.
          </p>
          <p>
            Khách hàng cần kiểm tra thông tin đơn hàng, số lượng, tình trạng bao bì và số tiền
            thanh toán trước khi nhận hàng.
          </p>
          <p>
            Trong một số trường hợp, phương thức thanh toán khi nhận hàng có thể không được áp
            dụng, bao gồm nhưng không giới hạn ở:
          </p>
          <ul className="mt-2 space-y-1.5">
            <Bullet>Đơn hàng có giá trị lớn.</Bullet>
            <Bullet>Đơn hàng giao đến khu vực xa, khó giao hoặc có chi phí vận chuyển cao.</Bullet>
            <Bullet>Đơn hàng đặt theo yêu cầu riêng.</Bullet>
            <Bullet>
              Đơn hàng dành cho đại lý, nhà phân phối hoặc khách hàng tổ chức có thỏa thuận thanh
              toán riêng.
            </Bullet>
            <Bullet>Các trường hợp khác được Merifarm thông báo khi xác nhận đơn hàng.</Bullet>
          </ul>
        </PolicySection>

        {/* 5 */}
        <PolicySection
          id="section-5"
          number="05"
          title="Thanh toán bằng chuyển khoản ngân hàng"
        >
          <p>
            Trường hợp thanh toán bằng chuyển khoản, Merifarm sẽ cung cấp thông tin tài khoản nhận
            thanh toán chính thức khi xác nhận đơn hàng.
          </p>
          <p>
            Khách hàng cần ghi rõ nội dung chuyển khoản theo hướng dẫn, có thể bao gồm tên khách
            hàng, số điện thoại, mã đơn hàng hoặc nội dung khác để Merifarm đối soát giao dịch.
          </p>
          <p>
            Đơn hàng có thể chỉ được xử lý sau khi Merifarm ghi nhận thanh toán thành công hoặc
            sau khi nhận được chứng từ chuyển khoản hợp lệ, tùy từng trường hợp.
          </p>
        </PolicySection>

        {/* 6 */}
        <PolicySection id="section-6" number="06" title="Xác nhận thanh toán">
          <p>
            Thanh toán được xem là hoàn tất khi số tiền tương ứng với giá trị đơn hàng đã được ghi
            nhận vào tài khoản chính thức của Merifarm hoặc được xác nhận bởi người có thẩm quyền
            của Merifarm.
          </p>
          <p>
            Việc khách hàng gửi hình ảnh giao dịch, biên lai hoặc xác nhận chuyển khoản có thể
            được sử dụng để hỗ trợ đối soát, nhưng không thay thế cho việc Merifarm xác nhận tiền
            đã nhận thành công.
          </p>
        </PolicySection>

        {/* 7 */}
        <PolicySection
          id="section-7"
          number="07"
          title="Giá bán, phí vận chuyển và chi phí phát sinh"
        >
          <p>
            Giá sản phẩm được hiển thị trên website hoặc được Merifarm thông báo cho khách hàng có
            thể chưa bao gồm phí vận chuyển, phí bốc xếp, phí giao hàng đặc biệt, thuế, chi phí
            phát sinh theo khu vực hoặc chi phí khác nếu có.
          </p>
          <p>
            Các chi phí phát sinh sẽ được Merifarm thông báo cho khách hàng trước khi xác nhận đơn
            hàng hoặc trước khi giao hàng nếu phát sinh sau đó do yêu cầu của khách hàng hoặc điều
            kiện giao hàng thực tế.
          </p>
        </PolicySection>

        {/* 8 */}
        <PolicySection
          id="section-8"
          number="08"
          title="Sai sót trong giá bán hoặc thông tin thanh toán"
        >
          <p>
            Trong trường hợp có sai sót về giá bán, phí vận chuyển, khuyến mãi, thông tin sản phẩm
            hoặc thông tin thanh toán do lỗi kỹ thuật, lỗi hiển thị, lỗi nhập liệu hoặc sự cố hệ
            thống, Merifarm có quyền điều chỉnh, từ chối hoặc hủy đơn hàng sau khi thông báo cho
            khách hàng.
          </p>
          <p>
            Trường hợp khách hàng đã thanh toán trước, Merifarm sẽ phối hợp hoàn lại khoản tiền đã
            thanh toán theo phương thức phù hợp nếu đơn hàng không thể tiếp tục thực hiện.
          </p>
        </PolicySection>

        {/* 9 */}
        <PolicySection id="section-9" number="09" title="Chứng từ, hóa đơn">
          <p>
            Tùy theo quy định pháp luật và yêu cầu hợp lệ của khách hàng, Merifarm có thể cung cấp
            chứng từ, phiếu giao hàng, xác nhận thanh toán, hóa đơn hoặc chứng từ liên quan đến
            đơn hàng.
          </p>
          <p>
            Khách hàng có nhu cầu xuất hóa đơn cần cung cấp đầy đủ, chính xác và kịp thời thông
            tin cần thiết theo quy định, bao gồm tên đơn vị, mã số thuế, địa chỉ, email nhận hóa
            đơn và thông tin khác nếu có.
          </p>
        </PolicySection>

        {/* 10 */}
        <PolicySection id="section-10" number="10" title="Cảnh báo an toàn thanh toán">
          <p>Khách hàng chỉ thực hiện thanh toán theo thông tin được Merifarm xác nhận chính thức.</p>
          <p>
            Merifarm không chịu trách nhiệm đối với khoản thanh toán được chuyển đến tài khoản, ví
            điện tử, cá nhân hoặc tổ chức không được Merifarm xác nhận là bên nhận thanh toán hợp
            lệ.
          </p>
          <p>
            Trường hợp phát hiện dấu hiệu giả mạo, lừa đảo hoặc thông tin thanh toán bất thường,
            khách hàng cần dừng giao dịch và liên hệ ngay với Merifarm để xác minh.
          </p>
        </PolicySection>

        {/* 11 */}
        <PolicySection id="section-11" number="11" title="Đối soát và khiếu nại thanh toán">
          <p>
            Mọi khiếu nại liên quan đến thanh toán cần được gửi kèm thông tin đơn hàng, chứng từ
            thanh toán và nội dung cần hỗ trợ.
          </p>
          <p>
            Merifarm sẽ tiếp nhận, kiểm tra và phản hồi trong thời gian hợp lý sau khi nhận đủ
            thông tin cần thiết từ khách hàng.
          </p>
        </PolicySection>
      </PolicyLayout>

      <LegalNote />
      <NeedHelpCTA />
    </>
  )
}
