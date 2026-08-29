import PolicyHero from '../../components/policy/PolicyHero'
import PolicyLayout from '../../components/policy/PolicyLayout'
import PolicySection from '../../components/policy/PolicySection'
import NeedHelpCTA from '../../components/policy/NeedHelpCTA'
import LegalNote from '../../components/policy/LegalNote'

const TOC = [
  'Phạm vi áp dụng',
  'Nguyên tắc đặt hàng',
  'Các bước mua hàng',
  'Trách nhiệm cung cấp thông tin của khách hàng',
  'Thông tin sản phẩm và tư vấn sử dụng',
  'Quyền từ chối hoặc hủy đơn hàng của Merifarm',
  'Thay đổi hoặc hủy đơn hàng từ phía khách hàng',
  'Xác nhận giao dịch',
  'Hỗ trợ sau mua',
]

function Bullet({ children }) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-dark" />
      <span>{children}</span>
    </li>
  )
}

function Step({ label, children }) {
  return (
    <div className="rounded-xl border border-soft bg-white px-4 py-3">
      <p className="font-semibold text-primary-dark">{label}</p>
      {children && <p className="mt-1 text-secondary">{children}</p>}
    </div>
  )
}

export default function HuongDanMuaHangPage() {
  return (
    <>
      <PolicyHero
        title="Hướng dẫn mua hàng"
        description="Hướng dẫn trình tự tìm kiếm sản phẩm, gửi yêu cầu đặt hàng, xác nhận đơn hàng và nhận hỗ trợ tư vấn từ Merifarm."
      />

      <PolicyLayout toc={TOC}>
        {/* 1 */}
        <PolicySection id="section-1" number="01" title="Phạm vi áp dụng">
          <p>
            Chính sách này áp dụng đối với khách hàng truy cập website Merifarm để tìm hiểu sản
            phẩm, gửi yêu cầu tư vấn, thêm sản phẩm vào giỏ hàng hoặc gửi yêu cầu đặt hàng đối
            với các sản phẩm phân bón do Merifarm phân phối hoặc cung cấp.
          </p>
          <p>
            Chính sách này áp dụng cho khách hàng cá nhân, nông hộ, nhà vườn, cửa hàng vật tư
            nông nghiệp, đại lý, đơn vị phân phối, trang trại, hợp tác xã và các tổ chức có nhu
            cầu mua hoặc tìm hiểu sản phẩm.
          </p>
        </PolicySection>

        {/* 2 */}
        <PolicySection id="section-2" number="02" title="Nguyên tắc đặt hàng">
          <p>
            Việc hiển thị sản phẩm, giá bán, mô tả và thông tin liên quan trên website nhằm mục
            đích giới thiệu sản phẩm, hỗ trợ khách hàng tham khảo và gửi yêu cầu đặt hàng.
          </p>
          <p>
            Đơn hàng chỉ được xem là đã được tiếp nhận sau khi khách hàng hoàn tất việc gửi thông
            tin đặt hàng hoặc liên hệ trực tiếp với Merifarm qua các kênh được công bố trên
            website.
          </p>
          <p>
            Đơn hàng chỉ được xem là đã được xác nhận khi Merifarm liên hệ lại và xác nhận đầy đủ
            các thông tin cần thiết, bao gồm sản phẩm, số lượng, giá bán, phí giao hàng nếu có,
            địa chỉ giao hàng, phương thức thanh toán và thời gian giao hàng dự kiến.
          </p>
        </PolicySection>

        {/* 3 */}
        <PolicySection id="section-3" number="03" title="Các bước mua hàng">
          <p>Khách hàng có thể thực hiện việc đặt hàng theo trình tự sau:</p>
          <div className="mt-3 space-y-3">
            <Step label="Bước 1: Tìm kiếm sản phẩm">
              Khách hàng có thể tìm kiếm sản phẩm theo tên sản phẩm, danh mục phân bón, loại cây
              trồng, nhu cầu sử dụng, dạng sản phẩm hoặc các tiêu chí tìm kiếm khác được hỗ trợ
              trên website.
            </Step>
            <Step label="Bước 2: Xem thông tin sản phẩm">
              Khách hàng cần đọc kỹ thông tin sản phẩm, bao gồm tên sản phẩm, quy cách, mô tả,
              công dụng tham khảo, giá bán, hình ảnh, ghi chú và các thông tin liên quan trước khi
              đưa sản phẩm vào giỏ hàng hoặc gửi yêu cầu tư vấn.
            </Step>
            <Step label="Bước 3: Thêm sản phẩm vào giỏ hàng">
              Khách hàng lựa chọn sản phẩm cần mua, kiểm tra số lượng, quy cách, giá tạm tính và
              bấm thêm vào giỏ hàng.
            </Step>
            <Step label="Bước 4: Gửi yêu cầu đặt hàng">
              Khách hàng điền thông tin cần thiết, bao gồm họ và tên, số điện thoại, địa chỉ giao
              hàng, ghi chú đơn hàng và các thông tin khác nếu được yêu cầu.
            </Step>
            <Step label="Bước 5: Merifarm xác nhận đơn hàng">
              Sau khi nhận được yêu cầu, Merifarm có thể liên hệ khách hàng để xác minh thông tin,
              tư vấn thêm nếu cần, xác nhận tình trạng hàng hóa, chi phí giao hàng, thời gian giao
              hàng và phương thức thanh toán.
            </Step>
            <Step label="Bước 6: Thanh toán và giao hàng">
              Khách hàng thực hiện thanh toán theo phương thức đã được thống nhất. Merifarm tiến
              hành xử lý, đóng gói và giao hàng theo nội dung đã xác nhận với khách hàng.
            </Step>
          </div>
        </PolicySection>

        {/* 4 */}
        <PolicySection
          id="section-4"
          number="04"
          title="Trách nhiệm cung cấp thông tin của khách hàng"
        >
          <p>
            Khách hàng có trách nhiệm cung cấp thông tin đầy đủ, chính xác và cập nhật khi gửi yêu
            cầu tư vấn hoặc đặt hàng.
          </p>
          <p>Các thông tin bao gồm nhưng không giới hạn ở:</p>
          <ul className="mt-2 space-y-1.5">
            <Bullet>Họ và tên</Bullet>
            <Bullet>Số điện thoại</Bullet>
            <Bullet>Địa chỉ giao hàng</Bullet>
            <Bullet>Sản phẩm cần mua</Bullet>
            <Bullet>Số lượng</Bullet>
            <Bullet>Nhu cầu sử dụng</Bullet>
            <Bullet>Ghi chú liên quan đến việc giao hàng hoặc tư vấn</Bullet>
          </ul>
          <p>
            Merifarm không chịu trách nhiệm đối với việc giao hàng chậm, giao sai địa chỉ, không
            liên hệ được hoặc phát sinh chi phí bổ sung nếu nguyên nhân xuất phát từ việc khách
            hàng cung cấp thông tin không chính xác, không đầy đủ hoặc không kịp thời cập nhật.
          </p>
        </PolicySection>

        {/* 5 */}
        <PolicySection
          id="section-5"
          number="05"
          title="Thông tin sản phẩm và tư vấn sử dụng"
        >
          <p>
            Thông tin về công dụng, mô tả hoặc gợi ý sử dụng sản phẩm trên website chỉ có tính
            chất tham khảo, hỗ trợ khách hàng trong quá trình lựa chọn sản phẩm.
          </p>
          <p>
            Hiệu quả sử dụng phân bón có thể phụ thuộc vào nhiều yếu tố như loại cây trồng, đất
            trồng, điều kiện thời tiết, kỹ thuật canh tác, liều lượng sử dụng, thời điểm sử dụng
            và phương pháp bảo quản.
          </p>
          <p>
            Khách hàng cần đọc kỹ hướng dẫn sử dụng trên bao bì sản phẩm, nhãn hàng hóa hoặc
            thông tin được nhà sản xuất công bố. Trường hợp cần hỗ trợ, khách hàng nên liên hệ
            Merifarm để được tư vấn thêm trước khi sử dụng.
          </p>
        </PolicySection>

        {/* 6 */}
        <PolicySection
          id="section-6"
          number="06"
          title="Quyền từ chối hoặc hủy đơn hàng của Merifarm"
        >
          <p>
            Merifarm có quyền từ chối, tạm ngừng hoặc hủy xử lý đơn hàng trong các trường hợp
            sau:
          </p>
          <ul className="mt-2 space-y-1.5">
            <Bullet>Sản phẩm tạm hết hàng hoặc không còn khả năng cung cấp.</Bullet>
            <Bullet>
              Thông tin khách hàng không đầy đủ, không chính xác hoặc không thể xác minh.
            </Bullet>
            <Bullet>
              Khách hàng không phản hồi xác nhận đơn hàng trong thời gian hợp lý.
            </Bullet>
            <Bullet>
              Giá bán, thông tin sản phẩm hoặc phí vận chuyển hiển thị sai do lỗi kỹ thuật, lỗi
              nhập liệu hoặc sự cố hệ thống.
            </Bullet>
            <Bullet>
              Đơn hàng có dấu hiệu gian lận, lạm dụng khuyến mãi, đặt hàng không thiện chí hoặc
              vi phạm chính sách của Merifarm.
            </Bullet>
            <Bullet>
              Việc thực hiện đơn hàng có thể vi phạm quy định pháp luật hoặc ảnh hưởng đến quyền
              và lợi ích hợp pháp của Merifarm hoặc bên thứ ba.
            </Bullet>
          </ul>
          <p>
            Trong trường hợp hủy đơn hàng, Merifarm sẽ thông báo cho khách hàng qua số điện thoại,
            email hoặc kênh liên hệ mà khách hàng đã cung cấp.
          </p>
        </PolicySection>

        {/* 7 */}
        <PolicySection
          id="section-7"
          number="07"
          title="Thay đổi hoặc hủy đơn hàng từ phía khách hàng"
        >
          <p>
            Khách hàng có thể yêu cầu thay đổi hoặc hủy đơn hàng trước khi đơn hàng được Merifarm
            bàn giao cho đơn vị vận chuyển hoặc trước khi hàng hóa được giao đi.
          </p>
          <p>
            Trường hợp đơn hàng đã được đóng gói, đã bàn giao vận chuyển hoặc đang trong quá trình
            giao hàng, việc thay đổi hoặc hủy đơn có thể không được chấp nhận hoặc có thể phát
            sinh chi phí vận chuyển, hoàn hàng, lưu kho hoặc chi phí khác nếu có.
          </p>
        </PolicySection>

        {/* 8 */}
        <PolicySection id="section-8" number="08" title="Xác nhận giao dịch">
          <p>
            Mọi xác nhận liên quan đến đơn hàng có thể được thực hiện qua điện thoại, email, tin
            nhắn, Zalo hoặc kênh liên hệ chính thức khác của Merifarm.
          </p>
          <p>
            Khách hàng có trách nhiệm kiểm tra thông tin xác nhận đơn hàng và phản hồi kịp thời
            nếu có sai sót.
          </p>
        </PolicySection>

        {/* 9 */}
        <PolicySection id="section-9" number="09" title="Hỗ trợ sau mua">
          <p>
            Sau khi giao hàng, Merifarm có thể hỗ trợ khách hàng về thông tin sản phẩm, hướng dẫn
            sử dụng tham khảo, chính sách đổi trả, giao hàng hoặc các vấn đề liên quan đến đơn
            hàng.
          </p>
          <p>
            Việc hỗ trợ sau mua không thay thế cho hướng dẫn kỹ thuật chuyên sâu tại địa phương
            hoặc khuyến nghị của chuyên gia nông nghiệp trong các trường hợp đặc thù về đất, cây
            trồng, bệnh cây hoặc điều kiện canh tác.
          </p>
        </PolicySection>
      </PolicyLayout>

      <LegalNote />
      <NeedHelpCTA />
    </>
  )
}
