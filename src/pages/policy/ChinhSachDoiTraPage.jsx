import PolicyHero from '../../components/policy/PolicyHero'
import PolicyLayout from '../../components/policy/PolicyLayout'
import PolicySection from '../../components/policy/PolicySection'
import NeedHelpCTA from '../../components/policy/NeedHelpCTA'
import LegalNote from '../../components/policy/LegalNote'

const TOC = [
  'Phạm vi áp dụng',
  'Nguyên tắc chung',
  'Các trường hợp được xem xét đổi trả',
  'Thời hạn gửi yêu cầu đổi trả',
  'Điều kiện sản phẩm đổi trả',
  'Trường hợp không áp dụng đổi trả',
  'Quy trình đổi trả',
  'Chi phí đổi trả',
  'Chính sách hoàn tiền',
  'Giới hạn trách nhiệm',
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

export default function ChinhSachDoiTraPage() {
  return (
    <>
      <PolicyHero
        title="Chính sách đổi trả / hoàn tiền"
        description="Quy định về điều kiện đổi trả, trường hợp không áp dụng đổi trả, quy trình tiếp nhận yêu cầu và nguyên tắc hoàn tiền đối với sản phẩm Merifarm."
      />

      <PolicyLayout toc={TOC}>
        {/* 1 */}
        <PolicySection id="section-1" number="01" title="Phạm vi áp dụng">
          <p>
            Chính sách này áp dụng đối với sản phẩm được khách hàng đặt mua từ Merifarm và có phát
            sinh yêu cầu đổi hàng, trả hàng hoặc hoàn tiền.
          </p>
          <p>
            Chính sách này không áp dụng cho sản phẩm không được mua trực tiếp từ Merifarm hoặc
            không chứng minh được nguồn gốc giao dịch với Merifarm.
          </p>
        </PolicySection>

        {/* 2 */}
        <PolicySection id="section-2" number="02" title="Nguyên tắc chung">
          <p>
            Merifarm tiếp nhận và xử lý yêu cầu đổi trả trên cơ sở thiện chí, minh bạch, đúng
            tình trạng thực tế của sản phẩm và phù hợp với chính sách đã công bố.
          </p>
          <p>
            Việc đổi trả hoặc hoàn tiền chỉ được thực hiện sau khi Merifarm kiểm tra, xác minh và
            xác nhận yêu cầu của khách hàng thuộc trường hợp được hỗ trợ.
          </p>
        </PolicySection>

        {/* 3 */}
        <PolicySection
          id="section-3"
          number="03"
          title="Các trường hợp được xem xét đổi trả"
        >
          <p>Merifarm có thể xem xét đổi trả trong các trường hợp sau:</p>
          <ul className="mt-2 space-y-1.5">
            <Bullet>Giao sai sản phẩm so với đơn hàng đã xác nhận.</Bullet>
            <Bullet>Giao thiếu sản phẩm so với đơn hàng đã xác nhận.</Bullet>
            <Bullet>Sản phẩm bị hư hỏng bao bì nghiêm trọng trong quá trình vận chuyển.</Bullet>
            <Bullet>Sản phẩm không đúng quy cách đã được Merifarm xác nhận.</Bullet>
            <Bullet>
              Sản phẩm có lỗi do nhà sản xuất hoặc có dấu hiệu bất thường được xác minh là không
              do lỗi bảo quản hoặc sử dụng của khách hàng.
            </Bullet>
            <Bullet>
              Các trường hợp khác được Merifarm xác nhận bằng văn bản, tin nhắn, email hoặc kênh
              liên hệ chính thức.
            </Bullet>
          </ul>
        </PolicySection>

        {/* 4 */}
        <PolicySection id="section-4" number="04" title="Thời hạn gửi yêu cầu đổi trả">
          <p>
            Khách hàng cần gửi yêu cầu đổi trả trong vòng 24 đến 48 giờ kể từ thời điểm nhận
            hàng, trừ trường hợp có thỏa thuận khác hoặc trường hợp đặc biệt được Merifarm chấp
            thuận.
          </p>
          <p>
            Yêu cầu gửi sau thời hạn nêu trên có thể không được hỗ trợ nếu Merifarm không có đủ cơ
            sở xác minh tình trạng hàng hóa tại thời điểm giao nhận.
          </p>
        </PolicySection>

        {/* 5 */}
        <PolicySection id="section-5" number="05" title="Điều kiện sản phẩm đổi trả">
          <p>Sản phẩm được yêu cầu đổi trả cần đáp ứng các điều kiện sau:</p>
          <ul className="mt-2 space-y-1.5">
            <Bullet>Còn nguyên bao bì hoặc còn đủ cơ sở xác minh tình trạng ban đầu.</Bullet>
            <Bullet>
              Chưa qua sử dụng, chưa pha trộn, chưa sang chiết, chưa mở bao bì nếu sản phẩm thuộc
              loại cần giữ nguyên niêm phong.
            </Bullet>
            <Bullet>
              Không bị hư hỏng do bảo quản sai cách, để nơi ẩm ướt, tiếp xúc trực tiếp với nước,
              ánh nắng, hóa chất hoặc điều kiện bất lợi khác.
            </Bullet>
            <Bullet>
              Còn đầy đủ nhãn, quy cách, tem, mã lô, bao bì hoặc dấu hiệu nhận diện sản phẩm nếu
              có.
            </Bullet>
            <Bullet>
              Có thông tin đơn hàng, hình ảnh, video hoặc chứng từ liên quan để Merifarm kiểm tra.
            </Bullet>
          </ul>
        </PolicySection>

        {/* 6 */}
        <PolicySection id="section-6" number="06" title="Trường hợp không áp dụng đổi trả">
          <p>Merifarm có quyền từ chối đổi trả trong các trường hợp sau:</p>
          <ul className="mt-2 space-y-1.5">
            <Bullet>
              Sản phẩm đã được sử dụng, mở bao, pha trộn, sang chiết hoặc thay đổi hiện trạng.
            </Bullet>
            <Bullet>
              Sản phẩm bị hư hỏng do khách hàng bảo quản không đúng điều kiện khuyến nghị.
            </Bullet>
            <Bullet>
              Khách hàng thay đổi nhu cầu mua hàng sau khi đơn hàng đã được xác nhận và giao đúng
              sản phẩm.
            </Bullet>
            <Bullet>
              Khách hàng đặt nhầm sản phẩm nhưng Merifarm đã tư vấn, xác nhận và giao đúng theo
              yêu cầu.
            </Bullet>
            <Bullet>
              Sản phẩm bị ảnh hưởng do điều kiện canh tác, thời tiết, đất trồng, liều lượng sử
              dụng hoặc phương pháp sử dụng không phù hợp.
            </Bullet>
            <Bullet>
              Khách hàng không cung cấp đủ bằng chứng, hình ảnh, video, thông tin đơn hàng hoặc
              không hợp tác trong quá trình kiểm tra.
            </Bullet>
            <Bullet>
              Sản phẩm thuộc chương trình thanh lý, giảm giá đặc biệt hoặc có điều kiện không đổi
              trả đã được thông báo trước.
            </Bullet>
            <Bullet>Yêu cầu đổi trả được gửi quá thời hạn tiếp nhận.</Bullet>
          </ul>
        </PolicySection>

        {/* 7 */}
        <PolicySection id="section-7" number="07" title="Quy trình đổi trả">
          <p>Quy trình tiếp nhận và xử lý đổi trả gồm các bước:</p>
          <div className="mt-3 space-y-3">
            <Step label="Bước 1">
              Khách hàng liên hệ Merifarm qua hotline, email hoặc kênh liên hệ chính thức.
            </Step>
            <Step label="Bước 2">
              Khách hàng cung cấp thông tin đơn hàng, hình ảnh sản phẩm, hình ảnh bao bì, video mở
              hàng nếu có, mô tả tình trạng và yêu cầu xử lý.
            </Step>
            <Step label="Bước 3">
              Merifarm kiểm tra thông tin, đối chiếu đơn hàng và đánh giá tình trạng sản phẩm.
            </Step>
            <Step label="Bước 4">
              Merifarm phản hồi phương án xử lý, có thể bao gồm đổi sản phẩm, bổ sung hàng thiếu,
              hỗ trợ chi phí, hoàn tiền hoặc từ chối yêu cầu nếu không đủ điều kiện.
            </Step>
            <Step label="Bước 5">
              Hai bên thực hiện phương án xử lý đã được xác nhận.
            </Step>
          </div>
        </PolicySection>

        {/* 8 */}
        <PolicySection id="section-8" number="08" title="Chi phí đổi trả">
          <p>
            Trường hợp lỗi phát sinh do Merifarm, nhà sản xuất hoặc quá trình giao hàng được xác
            minh không thuộc lỗi của khách hàng, Merifarm sẽ chịu hoặc hỗ trợ chi phí đổi trả phù
            hợp.
          </p>
          <p>
            Trường hợp lỗi phát sinh do khách hàng cung cấp sai thông tin, thay đổi nhu cầu, không
            nhận hàng, bảo quản sai cách hoặc sử dụng không đúng hướng dẫn, khách hàng có thể chịu
            chi phí vận chuyển, hoàn hàng, bốc xếp hoặc chi phí phát sinh khác.
          </p>
        </PolicySection>

        {/* 9 */}
        <PolicySection id="section-9" number="09" title="Chính sách hoàn tiền">
          <p>Hoàn tiền chỉ được thực hiện khi:</p>
          <ul className="mt-2 space-y-1.5">
            <Bullet>Yêu cầu của khách hàng đủ điều kiện xử lý.</Bullet>
            <Bullet>Sản phẩm đã được Merifarm kiểm tra và xác nhận.</Bullet>
            <Bullet>Hai bên thống nhất phương án hoàn tiền.</Bullet>
            <Bullet>Khách hàng cung cấp đầy đủ thông tin nhận hoàn tiền nếu cần.</Bullet>
          </ul>
          <p>
            Thời gian hoàn tiền phụ thuộc vào phương thức thanh toán, ngân hàng, đơn vị trung gian
            thanh toán hoặc quy trình đối soát nội bộ.
          </p>
          <p>
            Merifarm không chịu trách nhiệm đối với việc chậm nhận tiền hoàn do khách hàng cung
            cấp sai thông tin tài khoản, lỗi ngân hàng hoặc lỗi của bên trung gian thanh toán.
          </p>
        </PolicySection>

        {/* 10 */}
        <PolicySection id="section-10" number="10" title="Giới hạn trách nhiệm">
          <p>
            Trong phạm vi pháp luật cho phép, trách nhiệm của Merifarm đối với yêu cầu đổi trả
            hoặc hoàn tiền được giới hạn trong giá trị sản phẩm thuộc đơn hàng có tranh chấp, trừ
            trường hợp pháp luật có quy định khác.
          </p>
          <p>
            Merifarm không chịu trách nhiệm đối với thiệt hại gián tiếp, mất lợi nhuận, thiệt hại
            mùa vụ, thiệt hại do sử dụng sai hướng dẫn, bảo quản sai cách hoặc do các điều kiện
            canh tác ngoài khả năng kiểm soát của Merifarm.
          </p>
        </PolicySection>
      </PolicyLayout>

      <LegalNote />
      <NeedHelpCTA />
    </>
  )
}
