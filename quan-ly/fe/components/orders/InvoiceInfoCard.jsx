import { FileText } from 'lucide-react'

export default function InvoiceInfoCard({ form }) {
  if (!form.eInvoice) {
    return <p className="text-sm text-faint">Khách không yêu cầu xuất hóa đơn điện tử.</p>
  }

  return (
    <div className="rounded-xl border border-accent-dark/30 bg-white p-4">
      <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-accent-dark">
        <FileText size={15} /> Yêu cầu xuất hóa đơn {form.invoiceType === 'company' ? 'công ty' : 'cá nhân'}
      </p>
      <dl className="space-y-1 text-sm text-secondary">
        <div className="flex gap-2"><dt className="w-28 shrink-0 text-faint">Tên</dt><dd>{form.invoiceName}</dd></div>
        <div className="flex gap-2"><dt className="w-28 shrink-0 text-faint">Địa chỉ</dt><dd>{form.invoiceAddress}</dd></div>
        <div className="flex gap-2"><dt className="w-28 shrink-0 text-faint">Mã số thuế</dt><dd>{form.invoiceTaxCode}</dd></div>
        <div className="flex gap-2"><dt className="w-28 shrink-0 text-faint">Email</dt><dd>{form.invoiceEmail}</dd></div>
      </dl>
    </div>
  )
}
