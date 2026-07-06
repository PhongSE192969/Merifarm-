// Extended product data extracted from product labels and images.
// Used in ProductDetailPage to enrich the base products.json data.

export const CROP_LABELS = {
  lua: 'Lúa',
  'rau-mau': 'Rau màu',
  'cay-an-trai': 'Cây ăn trái',
  'hoa-kieng': 'Hoa kiểng',
  'cay-cong-nghiep': 'Cây công nghiệp',
}

export const FORM_LABELS = {
  bot: 'Dạng bột',
  hat: 'Dạng hạt',
  nuoc: 'Dạng lỏng',
}

export const CATEGORY_LABELS = {
  'phan-bon-la': 'Phân bón lá',
  'phan-bon-re': 'Phân bón rễ',
  npk: 'Phân bón NPK',
}

const COMMON_STORAGE = [
  'Bảo quản nơi khô ráo, thoáng mát.',
  'Tránh ánh nắng trực tiếp.',
  'Đậy kín nắp sau khi mở hoặc sau khi sử dụng.',
  'Không để sản phẩm tiếp xúc trực tiếp với nước khi chưa pha.',
  'Để xa tầm tay trẻ em và vật nuôi.',
  'Không bảo quản gần thực phẩm, nguồn nước sinh hoạt hoặc hóa chất không tương thích.',
]

const COMMON_WARNING =
  'Hiệu quả sử dụng sản phẩm có thể thay đổi tùy theo loại cây, tình trạng đất, điều kiện thời tiết, kỹ thuật canh tác và cách sử dụng thực tế. Khách hàng nên đọc kỹ hướng dẫn trên bao bì trước khi sử dụng.\n\nThông tin trên website chỉ có tính chất tham khảo và không thay thế hướng dẫn chính thức trên bao bì sản phẩm.'

const details = {
  'magie-bo-kem-no1': {
    overview:
      'Magie Bo Kẽm No.1 là phân bón lá trung vi lượng dạng bột hòa tan, hỗ trợ cây trồng bổ sung các nguyên tố vi lượng thiết yếu như Magie, Bo, Kẽm, Sắt và Mangan — những yếu tố đóng vai trò quan trọng trong quá trình sinh trưởng, ra hoa, đậu trái và tạo màu sắc trái.\n\nSản phẩm phù hợp cho nhiều nhóm cây trồng, đặc biệt trong các giai đoạn cây ra hoa, đậu trái, phát triển lá non và khi cây có biểu hiện thiếu vi lượng như lá vàng, trái nhỏ, đọt xoắn hoặc lá mỏng nhạt màu.',

    ingredientItems: [
      { label: 'Magie (Mg)', value: '0,48%' },
      { label: 'Bo (B)', value: '500 ppm' },
      { label: 'Kẽm (Zn)', value: '5.000 ppm' },
      { label: 'Sắt (Fe)', value: '10.000 ppm' },
      { label: 'Mangan (Mn)', value: '5.000 ppm' },
      { label: 'pH H₂O', value: '5' },
      { label: 'Độ ẩm', value: '5%' },
    ],
    ingredientNote: 'Thông tin thành phần được trình bày theo công bố trên bao bì sản phẩm.',

    benefitItems: [
      'Hỗ trợ lớn trái, đẹp màu và cải thiện chất lượng quả.',
      'Góp phần kích thích để nhánh, sai hoa và đậu trái nhiều hơn.',
      'Giúp chồi lá mập, hạn chế hiện tượng đọt xoắn và chùn đọt.',
      'Hỗ trợ lá xanh dày, mượt lá và tăng khả năng quang hợp.',
      'Góp phần kích thích ra rễ và phát triển bộ rễ khỏe mạnh.',
      'Hỗ trợ cây phục hồi trong giai đoạn thiếu vi lượng hoặc sau stress.',
    ],

    usageSteps: [
      'Pha Magie Bo Kẽm No.1 với nước sạch theo liều lượng khuyến cáo trên bao bì.',
      'Lắc hoặc khuấy đều dung dịch trước khi phun.',
      'Phun đều lên mặt lá, mặt dưới lá và phần ngọn cây vào buổi sáng sớm hoặc chiều mát.',
      'Phun định kỳ 7–10 ngày/lần hoặc điều chỉnh theo tình trạng cây thực tế.',
      'Tránh phun khi trời mưa, nắng gắt hoặc nhiệt độ quá cao trong ngày.',
    ],
    dosageTable: [
      { crop: 'Cây lương thực', dosage: '10–20g / bình 10 lít' },
      { crop: 'Rau màu', dosage: '5–10g / bình 8 lít' },
      { crop: 'Cây ăn quả & cây công nghiệp', dosage: '10–20g / bình 8 lít' },
      { crop: 'Hoa kiểng', dosage: '5–10g / bình 8 lít' },
    ],

    storageItems: COMMON_STORAGE,
    warningNote: COMMON_WARNING,

    quickInfo: {
      thanhPhan: 'Mg, Bo, Kẽm, Fe, Mn',
      xuatXu: 'Đang cập nhật',
      dang: 'Bột hòa tan',
      congDung: 'Lớn trái, đẹp màu, ra rễ',
      baoQuan: 'Nơi khô ráo, thoáng mát',
    },

    benefits: [
      { icon: 'Leaf', title: 'Lá xanh dày, mượt lá', text: 'Hỗ trợ bổ sung Magie và vi lượng giúp lá xanh dày, mượt và tăng hiệu quả quang hợp.' },
      { icon: 'Sun', title: 'Lớn trái, đẹp màu', text: 'Góp phần cải thiện kích thước, màu sắc và chất lượng trái thông qua bổ sung Kẽm và Bo.' },
      { icon: 'Sprout', title: 'Ra rễ, đẻ nhánh', text: 'Hỗ trợ phát triển bộ rễ và kích thích đẻ nhánh, sai hoa trong giai đoạn sinh trưởng.' },
      { icon: 'Shield', title: 'Hạn chế thiếu vi lượng', text: 'Phù hợp khi cây có dấu hiệu đọt xoắn, chùn đọt, vàng lá hoặc thiếu khoáng vi lượng.' },
    ],

    suitableWhen: [
      { icon: 'AlertCircle', title: 'Cây có đọt xoắn', desc: 'Hỗ trợ khi cây có hiện tượng đọt xoắn hoặc chùn đọt do thiếu vi lượng.' },
      { icon: 'Leaf', title: 'Lá vàng, bạc màu', desc: 'Phù hợp khi lá cây có dấu hiệu vàng nhạt hoặc thiếu dinh dưỡng vi lượng.' },
      { icon: 'Sun', title: 'Trái nhỏ, màu nhạt', desc: 'Hỗ trợ giai đoạn nuôi trái khi trái chậm lớn hoặc màu sắc chưa đẹp.' },
      { icon: 'Sprout', title: 'Cây ít hoa, đậu ít', desc: 'Phù hợp khi cây ra hoa kém hoặc tỉ lệ đậu trái thấp hơn bình thường.' },
      { icon: 'Zap', title: 'Sau giai đoạn stress', desc: 'Giúp bổ sung vi lượng cho cây sau thời kỳ chịu hạn, ngập hoặc sâu bệnh.' },
    ],

    specification: {
      nhomSanPham: 'Phân bón lá',
      quyCach: 'Gói 500g',
      dangSanPham: 'Bột hòa tan',
      xuatXu: 'Đang cập nhật',
    },
  },

  'ph-balance-humate-79': {
    overview:
      'pH Balance - Humate 79 Grown là sản phẩm phân bón sinh học hỗ trợ nâng pH đất, cải tạo đất và kích thích bộ rễ phát triển. Sản phẩm phù hợp cho nhiều nhóm cây trồng, đặc biệt trong các trường hợp đất có dấu hiệu chai cứng, cây sinh trưởng kém hoặc cần phục hồi sau thu hoạch.\n\nVới thành phần Axit Humic 22,6%, sản phẩm góp phần cải thiện cấu trúc đất, hỗ trợ trao đổi dinh dưỡng và tăng khả năng hấp thu của bộ rễ trong nhiều điều kiện đất và loại cây khác nhau.',

    ingredientItems: [
      { label: 'Axit Humic (C)', value: '22,6%' },
      { label: 'pH H₂O', value: '5' },
      { label: 'Độ ẩm', value: '30%' },
    ],
    ingredientNote: 'Thông tin thành phần được trình bày theo công bố trên bao bì sản phẩm.',

    benefitItems: [
      'Hỗ trợ nâng pH và cân bằng môi trường đất phù hợp cho cây trồng.',
      'Góp phần cải tạo đất, hỗ trợ đất tơi xốp và thông thoáng hơn.',
      'Kích thích phát triển rễ non, rễ tơ và tăng diện tích hấp thu của bộ rễ.',
      'Hỗ trợ nhú đọt, ra chồi nhanh và phát đọt mạnh trong giai đoạn sinh trưởng.',
      'Góp phần phục hồi cây sau thu hoạch hoặc sau giai đoạn suy yếu.',
      'Hỗ trợ tăng sức đề kháng tự nhiên của cây trồng.',
    ],

    usageSteps: [
      'Pha loãng pH Balance - Humate 79 Grown với nước tưới theo hướng dẫn trên bao bì.',
      'Tưới đều quanh vùng gốc hoặc khu vực rễ hoạt động của cây.',
      'Sử dụng định kỳ tùy theo tình trạng đất và giai đoạn sinh trưởng của cây.',
      'Nên tưới vào buổi sáng sớm hoặc chiều mát để tránh bay hơi nhanh.',
      'Có thể phối hợp với quy trình chăm sóc đất hiện tại theo hướng dẫn kỹ thuật.',
    ],
    dosageTable: null,

    storageItems: [
      'Đậy kín nắp sau khi sử dụng để giữ chất lượng sản phẩm.',
      ...COMMON_STORAGE,
    ],
    warningNote: COMMON_WARNING,

    quickInfo: {
      thanhPhan: 'Axit Humic 22,6%',
      xuatXu: 'Việt Nam',
      dang: 'Sinh học (hạt)',
      congDung: 'Cải tạo đất, hỗ trợ ra rễ',
      baoQuan: 'Nơi khô ráo, thoáng mát',
    },

    benefits: [
      { icon: 'Sprout', title: 'Hỗ trợ cải tạo đất', text: 'Góp phần làm đất tơi xốp, thông thoáng và thuận lợi hơn cho rễ phát triển.' },
      { icon: 'Leaf', title: 'Kích thích phát triển rễ', text: 'Hỗ trợ rễ non, rễ tơ và tăng khả năng hấp thu dinh dưỡng của bộ rễ.' },
      { icon: 'Shield', title: 'Hỗ trợ phục hồi cây', text: 'Phù hợp cho cây sau thu hoạch hoặc cây suy yếu do điều kiện canh tác.' },
      { icon: 'Zap', title: 'Dễ kết hợp quy trình', text: 'Có thể dùng trong nhiều giai đoạn tùy theo loại cây và hướng dẫn sử dụng.' },
    ],

    suitableWhen: [
      { icon: 'AlertCircle', title: 'Đất chai, bạc màu', desc: 'Hỗ trợ cải thiện độ tơi xốp và môi trường đất quanh vùng rễ.' },
      { icon: 'Sprout', title: 'Cây yếu rễ', desc: 'Phù hợp khi cây có bộ rễ kém phát triển hoặc hấp thu dinh dưỡng yếu.' },
      { icon: 'Leaf', title: 'Cây chậm phục hồi', desc: 'Hỗ trợ cây trong giai đoạn phục hồi chậm sau stress hoặc sâu bệnh.' },
      { icon: 'Sun', title: 'Sau thu hoạch', desc: 'Phù hợp cho cây sau vụ thu hoạch, hỗ trợ phục hồi và chuẩn bị vụ tiếp theo.' },
      { icon: 'Zap', title: 'Hấp thu kém', desc: 'Góp phần cải thiện khả năng hấp thu khi đất có pH chưa phù hợp.' },
    ],

    specification: {
      nhomSanPham: 'Phân bón rễ / Sinh học',
      quyCach: 'Hũ 1kg',
      dangSanPham: 'Sinh học (hạt)',
      xuatXu: 'Việt Nam',
    },
  },

  'ra-re-no-bui': {
    overview:
      'Ra Rễ - Nở Bụi là phân bón NPK 10-4-4 dạng lỏng, chuyên dùng cho cây lúa. Sản phẩm hỗ trợ ra rễ mạnh, đẻ nhánh nhanh, cứng cây và giúp cây lúa hấp thu dinh dưỡng hiệu quả hơn trong giai đoạn đầu sinh trưởng.\n\nSản phẩm sử dụng nguyên liệu ngoại nhập, được pha chế phù hợp với đặc điểm đất và khí hậu Việt Nam. Phù hợp cho các vùng đất phèn, mặn hoặc khi bộ rễ cây lúa cần được kích thích phục hồi và phát triển.',

    ingredientItems: [
      { label: 'Đạm tổng số (N)', value: '10%' },
      { label: 'Lân hữu hiệu (P₂O₅)', value: '4%' },
      { label: 'Kali hữu hiệu (K₂O)', value: '4%' },
      { label: 'Độ ẩm (dạng rắn)', value: '5%' },
      { label: 'Tỷ trọng (dạng lỏng)', value: '1,1' },
    ],
    ingredientNote: 'Phân bón NPK 10-4-4 K4P. Sử dụng nguyên liệu ngoại nhập.',

    benefitItems: [
      'Hỗ trợ lúa ra rễ mạnh và phục hồi bộ rễ bị tổn thương trong đất phèn mặn.',
      'Góp phần kích thích đẻ nhánh nhanh, nở bụi sớm và cứng cây.',
      'Hỗ trợ giải độc hữu cơ và giảm thiểu ảnh hưởng của phèn mặn.',
      'Giúp cân bằng pH trong điều kiện đất phèn hoặc nhiễm mặn.',
      'Hỗ trợ dòng mạp, trổ tập trung và vào gạo nhanh hơn.',
      'Giúp lá lúa xanh mướt, hạn chế vàng lá và sinh trưởng đồng đều.',
    ],

    usageSteps: [
      'Lắc đều chai Ra Rễ - Nở Bụi trước khi sử dụng.',
      'Pha với nước tưới theo tỉ lệ khuyến cáo trên bao bì sản phẩm.',
      'Tưới đều vào gốc và vùng rễ hoạt động của cây lúa.',
      'Áp dụng đúng giai đoạn (xem bảng liều lượng phía dưới) để đạt hiệu quả tốt nhất.',
      'Ngừng sử dụng trước thu hoạch ít nhất 5–7 ngày.',
    ],
    dosageTable: [
      { crop: 'Cây ăn trái & cây công nghiệp', dosage: '0,5–0,8 lít / 500 lít nước / 1.000m², tưới 3–4 lần/năm' },
      { crop: 'Rau màu & cây lương thực', dosage: '0,5–0,8 lít / 550 lít nước / 1.000m², tưới 3 đợt: 10–15, 25–30 và 40–45 ngày sau sạ' },
    ],

    storageItems: [...COMMON_STORAGE, 'Lắc đều trước khi sử dụng.'],
    warningNote: COMMON_WARNING,

    quickInfo: {
      thanhPhan: 'NPK 10-4-4 K4P',
      xuatXu: 'Nguyên liệu ngoại nhập',
      dang: 'Dạng lỏng',
      congDung: 'Ra rễ, đẻ nhánh, hạ phèn',
      baoQuan: 'Nơi khô ráo, lắc đều trước dùng',
    },

    benefits: [
      { icon: 'Sprout', title: 'Ra rễ mạnh, bộ rễ khỏe', text: 'Hỗ trợ lúa phát triển bộ rễ tốt, giúp cây hấp thu dinh dưỡng hiệu quả hơn.' },
      { icon: 'Leaf', title: 'Đẻ nhánh, nở bụi nhanh', text: 'Góp phần kích thích cây lúa đẻ nhánh sớm và nở bụi đồng đều, cứng cây.' },
      { icon: 'Shield', title: 'Giải độc, hạ phèn', text: 'Hỗ trợ cây trong điều kiện đất phèn mặn, giúp cây chịu đựng tốt hơn.' },
      { icon: 'Zap', title: 'Xanh mướt, hạn chế vàng lá', text: 'Góp phần giữ lá xanh mướt, hạn chế hiện tượng vàng lá và vàng chóp.' },
    ],

    suitableWhen: [
      { icon: 'Sprout', title: 'Lúa mới sạ', desc: 'Phù hợp giai đoạn đầu sau sạ, hỗ trợ cây bén rễ và ra rễ nhanh.' },
      { icon: 'Leaf', title: 'Đẻ nhánh chậm', desc: 'Hỗ trợ khi lúa đẻ nhánh chậm hoặc nở bụi kém so với kỳ vọng.' },
      { icon: 'AlertCircle', title: 'Đất phèn, mặn', desc: 'Góp phần giải độc và hỗ trợ cây trong điều kiện đất phèn hoặc nhiễm mặn.' },
      { icon: 'Sun', title: 'Cây yếu, lá nhạt màu', desc: 'Phù hợp khi cây lúa yếu, lá xanh nhạt hoặc sinh trưởng không đều.' },
      { icon: 'Zap', title: 'Sau stress ngập/hạn', desc: 'Hỗ trợ cây phục hồi sau khi gặp điều kiện bất thuận như ngập úng, hạn hán.' },
    ],

    specification: {
      nhomSanPham: 'Phân bón rễ / NPK',
      quyCach: 'Chai 250ml',
      dangSanPham: 'Dạng lỏng (nước)',
      xuatXu: 'Nguyên liệu ngoại nhập',
    },
  },

  'vo-gao-nhanh': {
    overview:
      'Vô Gạo Nhanh là phân bón NPK dạng lỏng (Phân bón lúa LM 17), chuyên dùng cho cây lúa. Sản phẩm hỗ trợ lá xanh dày, cứng cổ cây, trổ đòng thoát và giúp hạt lúa to đều, sáng bóng, ngăn chặn nguy cơ đổ ngã.\n\nSản phẩm phù hợp sử dụng trong nhiều giai đoạn sinh trưởng của cây lúa — từ đẻ nhánh, làm đòng, trổ bông đến giai đoạn vào chắc hạt — giúp nâng cao chất lượng và năng suất lúa gạo.',

    ingredientItems: [
      { label: 'Loại phân bón', value: 'NPK hỗn hợp — Phân bón lúa LM 17' },
    ],
    ingredientNote: 'Thành phần chi tiết theo công bố trên bao bì sản phẩm. Vui lòng tham khảo nhãn chai trước khi sử dụng.',

    benefitItems: [
      'Hỗ trợ lá xanh dày, tăng diện tích và hiệu quả quang hợp.',
      'Góp phần chín cứng cổ cây, tăng độ cứng thân và hạn chế đổ ngã.',
      'Hỗ trợ trổ đòng đồng loạt, thoát đòng nhanh và đồng đều trong ruộng.',
      'Góp phần tạo hạt to đều, sáng bóng và tăng tỷ lệ vào chắc.',
      'Hỗ trợ nâng cao năng suất lúa trong điều kiện canh tác bình thường.',
    ],

    usageSteps: [
      'Lắc đều chai Vô Gạo Nhanh trước khi sử dụng.',
      'Pha với nước sạch theo liều lượng khuyến cáo trên bao bì sản phẩm.',
      'Phun đều lên lá hoặc tưới vào gốc tùy theo giai đoạn sinh trưởng.',
      'Sử dụng đúng thời điểm (đẻ nhánh, làm đòng, trổ bông) để đạt hiệu quả tối ưu.',
      'Tránh phun khi trời mưa hoặc nắng gắt trong ngày.',
    ],
    dosageTable: [
      { crop: 'Cây lương thực (phun lá)', dosage: '12–15ml / 1.000m² / lần, giai đoạn đẻ nhánh và phân hóa đòng' },
      { crop: 'Cây công nghiệp, ăn trái', dosage: '150–200ml / gốc / lần, đầu, giữa và sau mùa mưa' },
      { crop: 'Giai đoạn làm bông', dosage: 'Pha 250ml / 200 lít nước' },
      { crop: 'Giai đoạn mang trái', dosage: 'Pha 150–200ml / 200 lít nước' },
    ],

    storageItems: [...COMMON_STORAGE, 'Lắc đều trước khi sử dụng.'],
    warningNote: COMMON_WARNING,

    quickInfo: {
      thanhPhan: 'NPK (Phân bón lúa LM 17)',
      xuatXu: 'Đang cập nhật',
      dang: 'Dạng lỏng',
      congDung: 'Xanh lá, cứng cây, vào gạo',
      baoQuan: 'Nơi khô ráo, lắc đều trước dùng',
    },

    benefits: [
      { icon: 'Leaf', title: 'Lá xanh dày, quang hợp tốt', text: 'Hỗ trợ lá xanh dày, tăng hiệu quả quang hợp và tích lũy dinh dưỡng cho cây lúa.' },
      { icon: 'Shield', title: 'Cứng cổ cây, ngăn đổ ngã', text: 'Góp phần chín cứng cổ cây, hạn chế tình trạng đổ ngã và thất thoát năng suất.' },
      { icon: 'Sun', title: 'Trổ đồng loạt, thoát đòng nhanh', text: 'Hỗ trợ trổ bông đồng đều trong toàn ruộng, thoát đòng nhanh và thuận lợi.' },
      { icon: 'Zap', title: 'Hạt to đều, sáng bóng', text: 'Góp phần giúp hạt lúa vào chắc đều, to sáng và tăng tỷ lệ thương phẩm.' },
    ],

    suitableWhen: [
      { icon: 'Sun', title: 'Giai đoạn làm đòng', desc: 'Phù hợp để sử dụng trong giai đoạn lúa làm đòng, nuôi đòng và trổ bông.' },
      { icon: 'Leaf', title: 'Lá mỏng, nhạt màu', desc: 'Hỗ trợ khi lá lúa mỏng, màu nhạt hoặc quang hợp kém hiệu quả.' },
      { icon: 'Shield', title: 'Cây dễ đổ ngã', desc: 'Phù hợp khi cây lúa có thân yếu hoặc ruộng có nguy cơ đổ ngã cao.' },
      { icon: 'Zap', title: 'Hạt vào chắc chậm', desc: 'Hỗ trợ giai đoạn hạt vào chắc chậm hoặc tỷ lệ lép cao hơn kỳ vọng.' },
      { icon: 'AlertCircle', title: 'Ruộng trổ không đều', desc: 'Góp phần hỗ trợ ruộng trổ bông đồng loạt và thoát đòng thuận lợi hơn.' },
    ],

    specification: {
      nhomSanPham: 'Phân bón lá / NPK',
      quyCach: 'Chai 250ml',
      dangSanPham: 'Dạng lỏng (nước)',
      xuatXu: 'Đang cập nhật',
    },
  },

  'lun-cay-ruoc-dong': {
    overview:
      'Lùn Cây - Rước Đòng là phân bón NPK dạng lỏng (Phân bón Lùm 12), chuyên dùng cho cây lúa trong giai đoạn làm đòng và trổ bông. Sản phẩm hỗ trợ ngắn lóng, cứng thân, dưỡng đòng mập và kích thích lúa trổ đồng loạt.\n\nPhù hợp cho vùng canh tác lúa có điều kiện dễ đổ ngã hoặc giai đoạn trổ bông gặp trở ngại. Sản phẩm được phát triển để hỗ trợ tối ưu hiệu quả vụ lúa trong giai đoạn quyết định năng suất.',

    ingredientItems: [
      { label: 'Đạm tổng số (N)', value: '4%' },
      { label: 'Lân hữu hiệu (P₂O₅)', value: '12%' },
      { label: 'Kali hữu hiệu (K₂O)', value: '10%' },
      { label: 'Độ ẩm (dạng rắn)', value: '5%' },
      { label: 'Tỷ trọng (dạng lỏng)', value: '1,2' },
    ],
    ingredientNote: 'Phân bón NPK — Phân bón Lùm 12. Thông tin theo công bố trên bao bì sản phẩm.',

    benefitItems: [
      'Hỗ trợ ngắn lóng, lùn cây và cứng thân lúa để hạn chế đổ ngã.',
      'Góp phần dưỡng đòng, nuôi tim đen và giúp đòng mập khỏe.',
      'Hỗ trợ lúa trổ bông đồng loạt và thoát đòng thuận lợi hơn.',
      'Góp phần tăng số lượng hạt trên bông và cải thiện tỷ lệ chắc hạt.',
      'Hỗ trợ cây đứng lá, mướt lá và hạn chế tình trạng đổ ngã trong giai đoạn trổ.',
    ],

    usageSteps: [
      'Lắc đều chai Lùn Cây - Rước Đòng trước khi sử dụng.',
      'Pha với nước sạch theo liều lượng trên bao bì sản phẩm.',
      'Sử dụng đúng thời điểm cây lúa bắt đầu làm đòng hoặc theo hướng dẫn kỹ thuật.',
      'Phun lên lá hoặc tưới gốc tùy theo giai đoạn và loại cây.',
      'Tránh phun khi trời mưa hoặc nhiệt độ quá cao.',
    ],
    dosageTable: [
      { crop: 'Cây lương thực', dosage: '12–15 lít dung dịch / 1.000m² / lần, giai đoạn đẻ nhánh và phân hóa đòng' },
      { crop: 'Cây công nghiệp, ăn trái', dosage: '150–200ml / gốc / lần, đầu, giữa và sau mùa mưa' },
      { crop: 'Giai đoạn làm bông', dosage: 'Pha 250ml / 200 lít nước' },
      { crop: 'Giai đoạn mang trái', dosage: 'Pha 150–200ml / 200 lít nước, khi mầm đọt non mới hình thành' },
    ],

    storageItems: [...COMMON_STORAGE, 'Lắc đều trước khi sử dụng.'],
    warningNote: COMMON_WARNING,

    quickInfo: {
      thanhPhan: 'NPK 4-12-10 (Lùm 12)',
      xuatXu: 'Đang cập nhật',
      dang: 'Dạng lỏng',
      congDung: 'Lùn cây, cứng thân, rước đòng',
      baoQuan: 'Nơi khô ráo, lắc đều trước dùng',
    },

    benefits: [
      { icon: 'Shield', title: 'Ngắn lóng, cứng thân', text: 'Hỗ trợ ngắn lóng và cứng thân giúp cây lúa vững chắc, hạn chế đổ ngã.' },
      { icon: 'Leaf', title: 'Nuôi đòng mập, khỏe', text: 'Góp phần dưỡng đòng và nuôi tim đen giúp đòng mập, khỏe và đầy đặn hơn.' },
      { icon: 'Sun', title: 'Trổ bông đồng loạt', text: 'Hỗ trợ lúa trổ bông đồng đều trong toàn ruộng và thoát đòng thuận lợi.' },
      { icon: 'Zap', title: 'Tăng số hạt/bông', text: 'Góp phần cải thiện số hạt trên bông và tỷ lệ hạt chắc cho năng suất tốt hơn.' },
    ],

    suitableWhen: [
      { icon: 'Shield', title: 'Cây dễ đổ ngã', desc: 'Phù hợp khi lúa có thân yếu, lóng dài hoặc ruộng có nguy cơ đổ ngã cao.' },
      { icon: 'Sun', title: 'Giai đoạn làm đòng', desc: 'Sử dụng đúng thời điểm cây lúa bắt đầu làm đòng để đạt hiệu quả tốt nhất.' },
      { icon: 'Leaf', title: 'Đòng yếu, ít hạt', desc: 'Hỗ trợ khi đòng phát triển yếu hoặc số hạt/bông thấp hơn kỳ vọng.' },
      { icon: 'AlertCircle', title: 'Trổ không đồng đều', desc: 'Góp phần khắc phục tình trạng lúa trổ không đều hoặc thoát đòng gặp trở ngại.' },
      { icon: 'Zap', title: 'Muốn nâng năng suất', desc: 'Phù hợp cho ruộng muốn cải thiện tỷ lệ chắc hạt và năng suất vụ lúa.' },
    ],

    specification: {
      nhomSanPham: 'Phân bón NPK',
      quyCach: 'Chai 250ml',
      dangSanPham: 'Dạng lỏng (nước)',
      xuatXu: 'Đang cập nhật',
    },
  },

  'loang-trai-tham-sau': {
    overview:
      'Loang Trải Thấm Sâu là chế phẩm dùng trong nông nghiệp (Siêu thấm thấu 30SL), được thiết kế để sử dụng kết hợp cùng phân bón hoặc thuốc bảo vệ thực vật. Sản phẩm hỗ trợ tăng khả năng bám dính, lan trải đều và thấm sâu trên bề mặt lá và cây trồng.\n\nKhi phối hợp với phân bón hoặc BVTV, sản phẩm giúp dung dịch tiếp xúc đều hơn trên toàn bề mặt lá, thấm sâu vào mô cây và tăng hiệu quả hấp thu — góp phần giúp phân bón và thuốc phát huy tốt hơn.',

    ingredientItems: [
      { label: 'Surfactant C10 Alcohol Ethoxylate', value: '30%' },
      { label: 'Phụ gia đặc biệt', value: 'Vừa đủ 70%' },
      { label: 'Tỷ trọng (dạng lỏng)', value: '1,1' },
      { label: 'Thể tích thực', value: '100ml' },
      { label: 'Số TCCS', value: '01:2024/LOANGTRAI-TS' },
    ],
    ingredientNote: 'Chế phẩm dùng trong nông nghiệp — Siêu thấm thấu 30SL. Thông tin theo công bố trên bao bì sản phẩm.',

    benefitItems: [
      'Tăng khả năng bám dính của dung dịch phân bón/thuốc BVTV trên bề mặt lá.',
      'Hỗ trợ lan trải đều, giúp dung dịch phủ đều hơn trên toàn bộ bề mặt cây.',
      'Kích nở khí không, hỗ trợ thấm sâu vào mô lá và cơ quan hấp thu của cây.',
      'Góp phần tăng hiệu quả hấp thu phân bón và thuốc BVTV.',
      'Giúp tiết kiệm lượng phân bón/thuốc nhờ phân bố đều hơn trên cây trồng.',
      'An toàn cho cây trồng và môi trường khi sử dụng đúng liều lượng.',
    ],

    usageSteps: [
      'Lắc đều chai Loang Trải Thấm Sâu trước khi sử dụng.',
      'Pha 100ml cho mỗi 300 lít nước (hoặc theo hướng dẫn trên bao bì).',
      'Phối hợp cùng dung dịch phân bón hoặc thuốc BVTV cần sử dụng.',
      'Phun ướt đều toàn bộ cây trồng — mặt lá, mặt dưới lá và thân cây.',
      'Sử dụng vào buổi sáng sớm hoặc chiều mát để tăng hiệu quả hấp thu.',
    ],
    dosageTable: [
      { crop: 'Phối với phân bón / thuốc BVTV', dosage: '100ml / 300 lít nước, phun ướt đều cây trồng' },
    ],

    storageItems: [
      'Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp.',
      'Đậy kín nắp chai sau khi sử dụng.',
      'Tránh xa tầm tay trẻ em và nguồn thực phẩm.',
      'Sử dụng vào buổi sáng sớm hoặc chiều mát.',
      'Không bảo quản gần nguồn nước sinh hoạt hoặc hóa chất không tương thích.',
    ],
    warningNote: COMMON_WARNING,

    quickInfo: {
      thanhPhan: 'Surfactant C10 AE 30%',
      xuatXu: 'Việt Nam',
      dang: 'Dung dịch (lỏng)',
      congDung: 'Tăng bám dính, thấm sâu',
      baoQuan: 'Nơi khô ráo, đậy kín sau dùng',
    },

    benefits: [
      { icon: 'Droplets', title: 'Tăng bám dính', text: 'Hỗ trợ phân bón và thuốc BVTV bám chặt hơn trên bề mặt lá, giảm trôi rửa do mưa.' },
      { icon: 'Zap', title: 'Loang trải đều', text: 'Giúp dung dịch phủ đều toàn bộ bề mặt cây, không bỏ sót vùng tiếp xúc quan trọng.' },
      { icon: 'Sprout', title: 'Thấm sâu hiệu quả', text: 'Hỗ trợ dung dịch thấm sâu vào mô lá và cơ quan hấp thu của cây trồng.' },
      { icon: 'Leaf', title: 'Tiết kiệm chi phí', text: 'Giúp tối ưu hiệu quả của phân bón và thuốc đã dùng, có thể giảm lượng cần thiết.' },
    ],

    suitableWhen: [
      { icon: 'Droplets', title: 'Phun trong mùa mưa', desc: 'Giúp tăng bám dính của dung dịch khi thời tiết dễ bị rửa trôi.' },
      { icon: 'Leaf', title: 'Lá trơn, khó thấm', desc: 'Phù hợp với các loại cây có bề mặt lá trơn, dung dịch dễ chảy đi.' },
      { icon: 'Zap', title: 'Muốn tăng hiệu quả', desc: 'Khi muốn tối ưu hiệu quả của phân bón hoặc thuốc BVTV đang sử dụng.' },
      { icon: 'Sun', title: 'Phun diện tích lớn', desc: 'Phù hợp khi phun trên diện tích lớn, cần đảm bảo phủ đều mà không tăng lượng thuốc.' },
      { icon: 'Shield', title: 'Cây hấp thu kém', desc: 'Hỗ trợ khi cây có dấu hiệu hấp thu chậm hoặc phân bón không phát huy hiệu quả.' },
    ],

    specification: {
      nhomSanPham: 'Chế phẩm nông nghiệp',
      quyCach: 'Chai 100ml',
      dangSanPham: 'Dung dịch lỏng (30SL)',
      xuatXu: 'Việt Nam',
    },
  },
}

export default details
