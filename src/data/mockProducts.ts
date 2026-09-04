import { Product } from '../types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    brand: 'Manyavar Mohey',
    title: 'Dusty Rose Embroidered Silk Lehenga',
    description: 'A stunning dusty rose silk lehenga set with intricate floral silver and zari embroidery. Paired with a matching embroidered blouse and soft net dupatta.',
    category: 'Women',
    subCategory: 'Ethnic Wear',
    price: 8999,
    originalPrice: 14999,
    discountPercentage: 40,
    rating: 4.8,
    ratingCount: 520,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBlEvY_zJCwMOZgnk4mQqpppPKMDJpLVjGNQoIfFMeCroviPY1op8CsOBY3VDAmE9hcbI8sWpTPuYktFwVe_FID1mcTaWNJmrj7NfKDVHDZWta8ap3x3RsVncnPQ7jbnYNCEh4QubY4ODr0nc23CEBCcsXUTEptCgVw_gm9X5r0JdoffnLuBcbbsjqa8yrNaPVtnDjOcM1pRW2TKMNI-laK52nuk7Ullukhd1gG921IjMSap9Yl2ade',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAg6rR9vSMIPVKhhmgrLZfWwgxXpRAuRD8hJk6kx0JiiXJwCs5P4S6fB_O04Wq4kiVyEzx8XtPJmq9imx1xd0ui6yD073mX7ZbldOje7JN60Ez8jSJl2uXIgpqVmT3B2DHHTNCwzak8sL90yZqwAuHT7R9VsDl37GrWQnn-vMSgCZDWL02F8wD9WnN1m4jUBt5bKh8EpsNvuOUOB2TlcUehf_ERmxXiL3WtNjnnDGNR_2OHSfn2k__A'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    attributes: {
      occasions: ['Wedding', 'Festive'],
      styles: ['Traditional', 'Elegant'],
      color: 'Dusty Rose',
      colorFamily: 'Pastel',
      fabric: 'Silk',
      fit: 'Regular',
      formality: 'Ultra Formal',
      isFlashy: false,
      tags: ['lehenga', 'wedding', 'silk', 'embroidery', 'pastel', 'ethnic', 'bridal', 'reception']
    }
  },
  {
    id: 'prod-02',
    brand: 'Sera',
    title: 'Women Crimson Solid Satin Maxi Evening Gown',
    description: 'Deep crimson red evening gown crafted in luxurious satin with a fluid drape, cowl neckline and subtle back crisscross straps.',
    category: 'Women',
    subCategory: 'Western Wear',
    price: 2499,
    originalPrice: 5999,
    discountPercentage: 58,
    rating: 4.2,
    ratingCount: 1240,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC5dR4xfXDwVNR0hBCkIpV5laXoxNhtNQRto5lR9O2JLzD7yEcS2fbGlwT8zL_ZI99H_jyERGHQSRT4-bfv4qN8n_DSYJW3zXBIJB65Yhu_9DybscBTGXXXzeuiTIrMt3Zoo88S_ZukYild9m70erJ5yr8ZC8MZml58It8YxYwAVHdaBsIveRo7_TGTCnoB9cDlav3Tb4sla_LFtRvF01DK0hBCwDqDWiG86BBpWXKJ2YbX-HfEnn0g',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBKmj2kW_wBQpOcBzixImNCxLihvrhzhr7L-uxlwB5asB6mWa6hf72ETg_cND_tr2uQy4JIav58rJP9CMyp7wz8yojBa6jAYmJ8QSABf0s5wS4DeZiPyMSee2pzN6ZT_P2hBfEWYTFYvcMudQ3wJDVPEsdDAqFxI1NOvomsDfPI1qR9BHk1q2P2CjMIHyFKojUsM2khYyxzGi6e42ffVOVgnMYTwLy6Fhpea5Y-7bSy661zefzUAtbG',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCQGPYzo9AlENa_EhwdwKvTkR-yCEl5mxawt2NEtOlHoHYdf4bX_cofecptlGvCkOTr8xumZSvQMYC9MV3F7JLqeNn-jhV76h5qE4FFKgq72LhtanaJjQPz0-2GFeXSFBtlzNwBLY3MYz8K8dn80CZPaNWZAdsX1vxT_r2vFozTblL09RCLF8xYU3cw9hOEJnlh1dGdkIt4ezuwkY-i6dASUcin3ZibaaMUZGTiUx_UJsO6nhn0sBFV',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCZs9beTGO63eySK3tihGDZIXZ06tj6NqK_7Gv7zWzapQnwC5BV9YRTY13kuwJnx2e7ShCO68gWPGPU2hkypzZyM-nD9tkWl5M8uBdUIN_-bt3G4ZycmD8hzFb6qzNZsYZDxrB_b7nZmMcuGHc9bfz-OQuWONman1l-pGmuOXd38H3ollfemc7QnnrMXRH5pUcTAoxGsUar7gSGP98nvMMKVZlBtQuxJ-u79jRMLf3puhonnUj9Sbwa'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    attributes: {
      occasions: ['Party', 'Cocktail', 'Wedding'],
      styles: ['Elegant', 'Chic'],
      color: 'Crimson Red',
      colorFamily: 'Dark',
      fabric: 'Satin',
      fit: 'Slim',
      formality: 'Semi-Formal',
      isFlashy: false,
      tags: ['gown', 'dress', 'satin', 'cocktail', 'evening', 'party', 'red']
    }
  },
  {
    id: 'prod-03',
    brand: 'Biba',
    title: 'Emerald Velvet Evening Gown',
    description: 'Regal emerald green maxi gown tailored in premium velvet with fine crystal work along the neckline and cuffs.',
    category: 'Women',
    subCategory: 'Western Wear',
    price: 7450,
    originalPrice: 10500,
    discountPercentage: 29,
    rating: 4.7,
    ratingCount: 380,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCLXIlzM2PhACCB5Y3yzFAPm0ufhWOCuBEQCDKMDm3nZJqB5Ysgn8clbDiqzlZ-qwQA5QkJWVkb0dJG5FYotCMq6595eHr5hIryeWPZyeptLMAPmxNiPfWDphweaX6GSZMKLYo90gG6gvSNU8lNHSeH2KT27GuHrkmQATFRKtk9Dw8JJcprRYSbQVYTVio6rcTvB7ElEdf-XmaFwwA1QFLIjnqq0AkUxsNESh7NkaWoPXAYeyGesa5g'
    ],
    sizes: ['M', 'L', 'XL'],
    inStock: true,
    attributes: {
      occasions: ['Wedding', 'Cocktail', 'Party'],
      styles: ['Elegant', 'Classic'],
      color: 'Emerald Green',
      colorFamily: 'Dark',
      fabric: 'Velvet',
      fit: 'Regular',
      formality: 'Ultra Formal',
      isFlashy: false,
      tags: ['gown', 'velvet', 'emerald', 'wedding', 'reception', 'elegant']
    }
  },
  {
    id: 'prod-04',
    brand: 'Kalki Fashion',
    title: 'Peach Pearl Embellished Georgette Saree',
    description: 'Ethereal pastel peach georgette saree featuring delicate handcrafted pearl borders and an embroidered silk unstitched blouse piece.',
    category: 'Women',
    subCategory: 'Ethnic Wear',
    price: 9200,
    originalPrice: 12000,
    discountPercentage: 23,
    rating: 4.9,
    ratingCount: 610,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAB4bxeYqOtZhFmoTcKcC2ZIgzxXetmVyK1V_AF_orrUZzkVWZoJIo_tB7wDLYoCe5ipfqjTszCXWlqqu1VEtPBYuNtEjD-dcc4KRIAF7libQ_KVEbsmFVwF8fPC7WnokvAjNi4n2n_6GtEAp0gWahTOSKcYfZ_SlJDhPIu_aughBp8DY0FARi3pmmFLV3MT1K8MxPhgKGlYOjl3L_bpcogT6AjdRsh8_DT6C5Q56SgMsWOVp6G_3EN'
    ],
    sizes: ['Free Size'],
    inStock: true,
    attributes: {
      occasions: ['Wedding', 'Festive'],
      styles: ['Traditional', 'Elegant'],
      color: 'Pastel Peach',
      colorFamily: 'Pastel',
      fabric: 'Georgette',
      fit: 'Regular',
      formality: 'Ultra Formal',
      isFlashy: false,
      tags: ['saree', 'pastel', 'wedding', 'pearl', 'georgette', 'ethnic', 'reception']
    }
  },
  {
    id: 'prod-05',
    brand: 'Ritu Kumar',
    title: 'Ivory Silk Zari Anarkali Suit',
    description: 'Classically tailored ivory silk anarkali suit featuring gold zari bootis, a churidar and a contrasting banarasi dupatta.',
    category: 'Women',
    subCategory: 'Ethnic Wear',
    price: 6800,
    originalPrice: 9990,
    discountPercentage: 32,
    rating: 4.5,
    ratingCount: 420,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAg6rR9vSMIPVKhhmgrLZfWwgxXpRAuRD8hJk6kx0JiiXJwCs5P4S6fB_O04Wq4kiVyEzx8XtPJmq9imx1xd0ui6yD073mX7ZbldOje7JN60Ez8jSJl2uXIgpqVmT3B2DHHTNCwzak8sL90yZqwAuHT7R9VsDl37GrWQnn-vMSgCZDWL02F8wD9WnN1m4jUBt5bKh8EpsNvuOUOB2TlcUehf_ERmxXiL3WtNjnnDGNR_2OHSfn2k__A'
    ],
    sizes: ['S', 'M', 'L'],
    inStock: true,
    attributes: {
      occasions: ['Wedding', 'Festive'],
      styles: ['Traditional', 'Minimal'],
      color: 'Ivory',
      colorFamily: 'Neutral',
      fabric: 'Silk',
      fit: 'Tailored',
      formality: 'Ultra Formal',
      isFlashy: false,
      tags: ['anarkali', 'silk', 'zari', 'ivory', 'wedding', 'daywear', 'ethnic']
    }
  },
  {
    id: 'prod-06',
    brand: 'MANGO',
    title: 'Emerald Silk Wrap Maxi Dress',
    description: 'Sophisticated emerald green silk wrap dress with short flutter sleeves, a tie-up waist and an elegant asymmetrical ruffled hem.',
    category: 'Women',
    subCategory: 'Western Wear',
    price: 5999,
    originalPrice: 9999,
    discountPercentage: 40,
    rating: 4.6,
    ratingCount: 890,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBI8s53O_j8_tmfiXuqyHTChX5N1kQK5a8IO9EnS8JTU7gAQQQK1yQdkM81Vhm-qcfnhZ5kE1sQgLtB5XnvEYDWWlBzr7LzxUMa1JYK-0yx3OgXttWynZSl5zZUqK0LePTpW0t29uyrBoqkD9xa0ZIrht6ansC_Wec5dzBRNCPnwGHcHnMV2U09VKk8EQ_aHNVEOjClhpxD-BFFkGzfjNu61X40gCyiUWuNXyniyGUvPXC9XAYZL_BK'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    inStock: true,
    attributes: {
      occasions: ['Cocktail', 'Party', 'Wedding'],
      styles: ['Elegant', 'Minimal'],
      color: 'Emerald',
      colorFamily: 'Dark',
      fabric: 'Silk',
      fit: 'Regular',
      formality: 'Semi-Formal',
      isFlashy: false,
      tags: ['dress', 'maxi', 'silk', 'wrap dress', 'emerald', 'wedding guest']
    }
  },
  {
    id: 'prod-07',
    brand: 'Sera',
    title: 'Navy Blue Embellished Lehenga Set',
    description: 'Rich navy blue silk lehenga adorned with mirror and sequin work on the flared skirt, paired with a designer sweetheart blouse.',
    category: 'Women',
    subCategory: 'Ethnic Wear',
    price: 8499,
    originalPrice: 13999,
    discountPercentage: 39,
    rating: 4.4,
    ratingCount: 310,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBxWWnA-f0tf0Plgzd9Ox_FoA7ZRprlo9vmscLAER2JwEk6Ty9PrvFWyIa8GY3a1D6mHchttMnR-Kv2J7kCnGBWjqRI2uYj3CEnk_gkjT_3ake1l-K-jx33xEenHzNyois3GJ0WcdTL7UKQxc6MRYUxij50a0NSSWEETH-2AGdV0jfOFIK5gCplnTBjKxuRNuI3V7OyBKZb6bbEFK-1iCSYHxMVQDutQDwMOS4gyI2ex0V7MRbrgvw3'
    ],
    sizes: ['S', 'M', 'L'],
    inStock: true,
    attributes: {
      occasions: ['Wedding', 'Festive', 'Party'],
      styles: ['Traditional', 'Trendy'],
      color: 'Navy Blue',
      colorFamily: 'Dark',
      fabric: 'Silk',
      fit: 'Regular',
      formality: 'Ultra Formal',
      isFlashy: true,
      tags: ['lehenga', 'navy', 'sequin', 'wedding', 'sangeet', 'ethnic']
    }
  },
  {
    id: 'prod-08',
    brand: 'Zara',
    title: 'Blush Tailored Co-ord Set',
    description: 'Blush pink structured two-piece blazer and wide-leg trouser co-ord set made from breathable modal blend.',
    category: 'Women',
    subCategory: 'Western Wear',
    price: 7990,
    originalPrice: 9990,
    discountPercentage: 20,
    rating: 4.5,
    ratingCount: 460,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCkAubvR1rYt4YT3Ih_8kZjMyPnQlLuEePXASvct9NOaASHZNzGTYLw_d8hXW38k25VcX3K1tCIhBb7O8I9cR30UiWUs4sikOSyobDEzLhp99Jo88C6h8D4ebRpc26wU3JhRRVVrC6rjo9PfJDdJEIHHPqxZEtMoJOB7e87lpeW8jkgAnXmZ51lzGFRguw49BhG1ii5ETYZFmzRb6pO2sq-thzsrhN0zHpqSI7DNpDzQFZOiq24QPFM'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    inStock: true,
    attributes: {
      occasions: ['Work', 'Party', 'Cocktail'],
      styles: ['Minimal', 'Elegant', 'Chic'],
      color: 'Blush Pink',
      colorFamily: 'Pastel',
      fabric: 'Modal',
      fit: 'Tailored',
      formality: 'Smart Casual',
      isFlashy: false,
      tags: ['co-ord', 'suit', 'blazer', 'pastel', 'blush', 'work', 'modern']
    }
  },
  {
    id: 'prod-09',
    brand: 'Anouk',
    title: 'Women Floral Printed Tiered Maxi Dress',
    description: 'Breezy lilac and pink floral tiered cotton maxi dress with subtle puff sleeves and a smocked back.',
    category: 'Women',
    subCategory: 'Western Wear',
    price: 1249,
    originalPrice: 2499,
    discountPercentage: 50,
    rating: 4.3,
    ratingCount: 1540,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBO6wH5kZxucRuzq_JFvt8-IMXu6uMO5JVcrDMf5-BhOeOdHPnW9J2hVIkbOPpOSMpKptLRnODcdqPRFFv9m6hE07nqMbIxC-oACkh7SOWLje3Rno7d0gMW7f1HWduMIf4xMnerJ6Qq8G6BQhmd5zEt45dwAfRyQW_gWNU9Q7qawFICKyFVuyyy2FdDeFEOPtS6H-PAs9lZ6jX0V2fsiy4R7TrSAKDD4nyNKQMugwsUtOmRxfFywNuK'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    attributes: {
      occasions: ['Vacation', 'Casual'],
      styles: ['Boho', 'Casual'],
      color: 'Lilac Pink',
      colorFamily: 'Pastel',
      fabric: 'Cotton',
      fit: 'Relaxed',
      formality: 'Casual',
      isFlashy: false,
      tags: ['dress', 'maxi', 'floral', 'vacation', 'cotton', 'summer', 'casual']
    }
  },
  {
    id: 'prod-10',
    brand: 'Roadster',
    title: 'Men Oversized Pure Cotton T-Shirt',
    description: 'Drop-shoulder heavy-gauge pure cotton graphic t-shirt in pale pink with modern typographic print.',
    category: 'Men',
    subCategory: 'T-Shirts',
    price: 499,
    originalPrice: 999,
    discountPercentage: 50,
    rating: 4.1,
    ratingCount: 3200,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAjMdIPVUnvgPKm2HY7Dy-KdkPsLPQ3XTnD3Pou58FLgry8E2mFl8rpg2Ea9gY7H-YdW4g5xTFkqowmTbfoZl7ktz7oLaF6rVMKeAitwziHaNoq2hdPEek75fJcaYHmEU_p-sqm3Fn0shPBQH0G13J-HeFd7UjfMmxPYEUaBlF0VolKs096tY2MlMrql_aod3Gx7MSQO4Ty8UyY1PQ9fy-PCNKWoSXeCRAGpDnQ7ftMMhzcf0Z6v9i5'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    attributes: {
      occasions: ['Casual', 'Daily Wear'],
      styles: ['Trendy', 'Casual'],
      color: 'Pale Pink',
      colorFamily: 'Pastel',
      fabric: 'Cotton',
      fit: 'Oversized',
      formality: 'Casual',
      isFlashy: false,
      tags: ['tshirt', 'oversized', 'cotton', 'streetwear', 'casual', 'men']
    }
  },
  {
    id: 'prod-11',
    brand: 'H&M',
    title: 'Tailored Linen-Blend Slim Blazer',
    description: 'Single-breasted slim fit blazer in an ivory linen and cotton blend with notched lapels and flap front pockets.',
    category: 'Men',
    subCategory: 'Western Wear',
    price: 3499,
    originalPrice: 5999,
    discountPercentage: 42,
    rating: 4.4,
    ratingCount: 780,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDCJk5RwERQdHypdHHgiI_GJIS7Gp1hDF60s3YzLKn6IJl2NeckT--dIMXEHcDrCgR9eXGXXUBw0ZsMXO1yPeKsbw3BvrO8OJSsy4k2W4fmTH24V7fJtikXreovx7zu3GoQJh520o0cil3s9JDTZT4P1a3dg5PgdQXjPQPfMWFYW9I18VaS2Z-eNCISVvVtD_lzBy3v-5DR_AEx1eZABuWUtIfgytIdr7y_1fAT1opgmEsfgpUzu3fM'
    ],
    sizes: ['38', '40', '42', '44'],
    inStock: true,
    attributes: {
      occasions: ['Work', 'Casual', 'Party'],
      styles: ['Minimal', 'Elegant'],
      color: 'Ivory Neutral',
      colorFamily: 'Neutral',
      fabric: 'Linen Blend',
      fit: 'Slim',
      formality: 'Smart Casual',
      isFlashy: false,
      tags: ['blazer', 'linen', 'formal', 'work', 'office', 'summer', 'men']
    }
  },
  {
    id: 'prod-12',
    brand: 'FabIndia',
    title: 'Handloom Indigo Long Cotton Kurta',
    description: 'Straight-fit long indigo cotton kurta featuring subtle woven dabu geometric prints and a mandarin collar.',
    category: 'Men',
    subCategory: 'Ethnic Wear',
    price: 1899,
    originalPrice: 2499,
    discountPercentage: 24,
    rating: 4.5,
    ratingCount: 1100,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCsuU7XZLew7TPOAt10TmqCfbGOovjKXxmANOiGoCkqlTMovA5c9-F2R2lEzw4cCaMfrRbR4fweA-RVS5QTINQ0YGGcoWIpvF5XuPs0eQe-xZTmn9NtjxgglfjaAHFjHnKIil9YaJ0BGN0-nwkbn2bcclamAn7VNeqhATva0BzPG3j9Vhuqmwl6FALlnYaOgV5qNZE-qKnaISzO2nhnJQDzJ4T14DEDnxvI5MDxI13CnOhj1NBUrDUJ'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    attributes: {
      occasions: ['Festive', 'Casual', 'Work'],
      styles: ['Traditional', 'Minimal'],
      color: 'Indigo Blue',
      colorFamily: 'Dark',
      fabric: 'Cotton',
      fit: 'Regular',
      formality: 'Smart Casual',
      isFlashy: false,
      tags: ['kurta', 'cotton', 'indigo', 'ethnic', 'handloom', 'men', 'festive']
    }
  },
  {
    id: 'prod-13',
    brand: 'Vero Moda',
    title: 'Pleated Lilac Pastel Midi Dress',
    description: 'A-line pleated chiffon midi dress in pastel lilac with a crossover V-neckline and flutter short sleeves.',
    category: 'Women',
    subCategory: 'Western Wear',
    price: 2199,
    originalPrice: 4299,
    discountPercentage: 48,
    rating: 4.4,
    ratingCount: 650,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBkR5LlgIuBvS9njxab4bqC5vbXETsEBjxBXsxgl3a-t7ILijW8SwOMDwMR0CBnULrhHDqMB5XfWoazqYSPL1x-jAAh9Qx9t2UCbCtaQdIdx2-sqo1xy_7jv--7CrZplRIWcYe5P8Ii2hjEPGjj9rFOmerCEmyrQqYDpQanw0fGNMbq83kWMzbAg5b3y3f1mh-Dx1h5NFv0djW18ditDCutRNv8ikXOu3EHyJJLRPmsMVLbNnQEoiH'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    inStock: true,
    attributes: {
      occasions: ['Vacation', 'Party', 'Casual'],
      styles: ['Trendy', 'Chic'],
      color: 'Lilac',
      colorFamily: 'Pastel',
      fabric: 'Chiffon',
      fit: 'Regular',
      formality: 'Semi-Formal',
      isFlashy: false,
      tags: ['dress', 'midi', 'pastel', 'pleated', 'vacation', 'brunch', 'summer']
    }
  },
  {
    id: 'prod-14',
    brand: 'W for Woman',
    title: 'Geometric Printed Festive Kurta Set',
    description: 'Modern silhouette straight kurta with matching cigarette pants and a dual-tone printed organza dupatta.',
    category: 'Women',
    subCategory: 'Ethnic Wear',
    price: 2799,
    originalPrice: 4999,
    discountPercentage: 44,
    rating: 4.3,
    ratingCount: 920,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBM-0RRb7rtE4mrZs2GthE_2fiuiOmgZ_HatdtrJq0zZ0TC6FBlajYkd_ia7zrjURto4blM38haxw2p6xZEpExbwa4axx0zzK-o-I4g8oNnVgh0nRGObvrWe8jM7VCAzGPIb1rKEfpMB-rXVr9zFRL9tCQelu3yc9BZCkvqtB8sSmuGBrHvBvD7pYaV0xl7_3XE_f8jeA0zRX9c3kbYRvtFiEMK0KcSpNW3p45myiUjMwls5_tkniNS'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    attributes: {
      occasions: ['Festive', 'Work', 'Casual'],
      styles: ['Traditional', 'Chic'],
      color: 'Mustard Gold',
      colorFamily: 'Bright',
      fabric: 'Viscose Blend',
      fit: 'Straight',
      formality: 'Smart Casual',
      isFlashy: false,
      tags: ['kurta set', 'festive', 'ethnic', 'work wear', 'contemporary']
    }
  },
  {
    id: 'prod-15',
    brand: 'Forever New',
    title: 'Champagne Sequin Cocktail Mini Dress',
    description: 'Dazzling champagne gold all-over sequin cocktail dress with a square neckline and bodycon fit.',
    category: 'Women',
    subCategory: 'Western Wear',
    price: 6400,
    originalPrice: 8800,
    discountPercentage: 27,
    rating: 4.6,
    ratingCount: 340,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCLXIlzM2PhACCB5Y3yzFAPm0ufhWOCuBEQCDKMDm3nZJqB5Ysgn8clbDiqzlZ-qwQA5QkJWVkb0dJG5FYotCMq6595eHr5hIryeWPZyeptLMAPmxNiPfWDphweaX6GSZMKLYo90gG6gvSNU8lNHSeH2KT27GuHrkmQATFRKtk9Dw8JJcprRYSbQVYTVio6rcTvB7ElEdf-XmaFwwA1QFLIjnqq0AkUxsNESh7NkaWoPXAYeyGesa5g'
    ],
    sizes: ['S', 'M', 'L'],
    inStock: true,
    attributes: {
      occasions: ['Party', 'Cocktail'],
      styles: ['Trendy', 'Glamorous'],
      color: 'Champagne Gold',
      colorFamily: 'Metallic',
      fabric: 'Sequin Poly',
      fit: 'Slim',
      formality: 'Semi-Formal',
      isFlashy: true,
      tags: ['sequin', 'cocktail', 'party', 'dress', 'metallic', 'flashy', 'night out']
    }
  },
  {
    id: 'prod-16',
    brand: 'Carlton London',
    title: 'Rose Gold Ankle Strap Stiletto Heels',
    description: 'Sleek 3.5-inch metallic rose gold stiletto heels with padded insole and delicate rhinestone buckle.',
    category: 'Women',
    subCategory: 'Footwear',
    price: 2899,
    originalPrice: 4995,
    discountPercentage: 42,
    rating: 4.4,
    ratingCount: 510,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBlEvY_zJCwMOZgnk4mQqpppPKMDJpLVjGNQoIfFMeCroviPY1op8CsOBY3VDAmE9hcbI8sWpTPuYktFwVe_FID1mcTaWNJmrj7NfKDVHDZWta8ap3x3RsVncnPQ7jbnYNCEh4QubY4ODr0nc23CEBCcsXUTEptCgVw_gm9X5r0JdoffnLuBcbbsjqa8yrNaPVtnDjOcM1pRW2TKMNI-laK52nuk7Ullukhd1gG921IjMSap9Yl2ade'
    ],
    sizes: ['36', '37', '38', '39', '40'],
    inStock: true,
    attributes: {
      occasions: ['Wedding', 'Party', 'Cocktail'],
      styles: ['Elegant', 'Glamorous'],
      color: 'Rose Gold',
      colorFamily: 'Metallic',
      fabric: 'Synthetic Leather',
      fit: 'Regular',
      formality: 'Semi-Formal',
      isFlashy: true,
      tags: ['heels', 'stilettos', 'footwear', 'rose gold', 'wedding footwear', 'party']
    }
  },
  {
    id: 'prod-17',
    brand: 'Metro',
    title: 'Gold-Toned Embellished Ethnic Block Heels',
    description: 'Comfortable 2-inch block heels with embroidered zari front strap and cushioned footbed.',
    category: 'Women',
    subCategory: 'Footwear',
    price: 1990,
    originalPrice: 2990,
    discountPercentage: 33,
    rating: 4.6,
    ratingCount: 890,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAB4bxeYqOtZhFmoTcKcC2ZIgzxXetmVyK1V_AF_orrUZzkVWZoJIo_tB7wDLYoCe5ipfqjTszCXWlqqu1VEtPBYuNtEjD-dcc4KRIAF7libQ_KVEbsmFVwF8fPC7WnokvAjNi4n2n_6GtEAp0gWahTOSKcYfZ_SlJDhPIu_aughBp8DY0FARi3pmmFLV3MT1K8MxPhgKGlYOjl3L_bpcogT6AjdRsh8_DT6C5Q56SgMsWOVp6G_3EN'
    ],
    sizes: ['36', '37', '38', '39', '40'],
    inStock: true,
    attributes: {
      occasions: ['Wedding', 'Festive'],
      styles: ['Traditional', 'Elegant'],
      color: 'Antique Gold',
      colorFamily: 'Metallic',
      fabric: 'Embroidered Silk',
      fit: 'Regular',
      formality: 'Semi-Formal',
      isFlashy: false,
      tags: ['block heels', 'footwear', 'ethnic footwear', 'gold', 'wedding', 'comfortable']
    }
  },
  {
    id: 'prod-18',
    brand: 'Lavie',
    title: 'Blush Pink Structured Satchel Handbag',
    description: 'Elegant textured faux leather satchel with dual grab handles, detachable shoulder strap and gold metallic hardware.',
    category: 'Women',
    subCategory: 'Accessories',
    price: 1649,
    originalPrice: 3990,
    discountPercentage: 58,
    rating: 4.3,
    ratingCount: 1450,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBO6wH5kZxucRuzq_JFvt8-IMXu6uMO5JVcrDMf5-BhOeOdHPnW9J2hVIkbOPpOSMpKptLRnODcdqPRFFv9m6hE07nqMbIxC-oACkh7SOWLje3Rno7d0gMW7f1HWduMIf4xMnerJ6Qq8G6BQhmd5zEt45dwAfRyQW_gWNU9Q7qawFICKyFVuyyy2FdDeFEOPtS6H-PAs9lZ6jX0V2fsiy4R7TrSAKDD4nyNKQMugwsUtOmRxfFywNuK'
    ],
    sizes: ['Onesize'],
    inStock: true,
    attributes: {
      occasions: ['Work', 'Casual', 'Party'],
      styles: ['Minimal', 'Chic'],
      color: 'Blush Pink',
      colorFamily: 'Pastel',
      fabric: 'Faux Leather',
      fit: 'Regular',
      formality: 'Smart Casual',
      isFlashy: false,
      tags: ['bag', 'handbag', 'satchel', 'pastel', 'work bag', 'accessories']
    }
  },
  {
    id: 'prod-19',
    brand: 'Accessher',
    title: 'Beaded Floral Embroidered Potli Bag',
    description: 'Traditional drawstring ethnic potli bag hand-embellished with micro pearls, sequins, and hanging silk tassels.',
    category: 'Women',
    subCategory: 'Accessories',
    price: 1499,
    originalPrice: 2999,
    discountPercentage: 50,
    rating: 4.5,
    ratingCount: 710,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBI8s53O_j8_tmfiXuqyHTChX5N1kQK5a8IO9EnS8JTU7gAQQQK1yQdkM81Vhm-qcfnhZ5kE1sQgLtB5XnvEYDWWlBzr7LzxUMa1JYK-0yx3OgXttWynZSl5zZUqK0LePTpW0t29uyrBoqkD9xa0ZIrht6ansC_Wec5dzBRNCPnwGHcHnMV2U09VKk8EQ_aHNVEOjClhpxD-BFFkGzfjNu61X40gCyiUWuNXyniyGUvPXC9XAYZL_BK'
    ],
    sizes: ['Onesize'],
    inStock: true,
    attributes: {
      occasions: ['Wedding', 'Festive'],
      styles: ['Traditional', 'Elegant'],
      color: 'Cream Gold',
      colorFamily: 'Metallic',
      fabric: 'Velvet Raw Silk',
      fit: 'Regular',
      formality: 'Ultra Formal',
      isFlashy: true,
      tags: ['potli', 'bag', 'ethnic bag', 'wedding', 'accessories', 'pearls']
    }
  },
  {
    id: 'prod-20',
    brand: 'Marks & Spencer',
    title: 'Pure Linen Regular Fit Formal Shirt',
    description: 'Breathable pure Irish linen solid formal shirt with classic collar, single-cuff sleeves and curved hem.',
    category: 'Men',
    subCategory: 'Western Wear',
    price: 2299,
    originalPrice: 3499,
    discountPercentage: 34,
    rating: 4.6,
    ratingCount: 940,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDCJk5RwERQdHypdHHgiI_GJIS7Gp1hDF60s3YzLKn6IJl2NeckT--dIMXEHcDrCgR9eXGXXUBw0ZsMXO1yPeKsbw3BvrO8OJSsy4k2W4fmTH24V7fJtikXreovx7zu3GoQJh520o0cil3s9JDTZT4P1a3dg5PgdQXjPQPfMWFYW9I18VaS2Z-eNCISVvVtD_lzBy3v-5DR_AEx1eZABuWUtIfgytIdr7y_1fAT1opgmEsfgpUzu3fM'
    ],
    sizes: ['39', '40', '42', '44'],
    inStock: true,
    attributes: {
      occasions: ['Work', 'Casual'],
      styles: ['Minimal', 'Classic'],
      color: 'White',
      colorFamily: 'Neutral',
      fabric: 'Pure Linen',
      fit: 'Regular',
      formality: 'Smart Casual',
      isFlashy: false,
      tags: ['shirt', 'linen', 'formal', 'office', 'work', 'summer', 'men']
    }
  },
  {
    id: 'prod-21',
    brand: 'Louis Philippe',
    title: 'Men Charcoal Slim Fit Formal Trousers',
    description: 'Wrinkle-resistant poly-viscose charcoal formal trousers with a clean flat front and tailored stretch waistband.',
    category: 'Men',
    subCategory: 'Western Wear',
    price: 2599,
    originalPrice: 3999,
    discountPercentage: 35,
    rating: 4.4,
    ratingCount: 1120,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBM-0RRb7rtE4mrZs2GthE_2fiuiOmgZ_HatdtrJq0zZ0TC6FBlajYkd_ia7zrjURto4blM38haxw2p6xZEpExbwa4axx0zzK-o-I4g8oNnVgh0nRGObvrWe8jM7VCAzGPIb1rKEfpMB-rXVr9zFRL9tCQelu3yc9BZCkvqtB8sSmuGBrHvBvD7pYaV0xl7_3XE_f8jeA0zRX9c3kbYRvtFiEMK0KcSpNW3p45myiUjMwls5_tkniNS'
    ],
    sizes: ['30', '32', '34', '36'],
    inStock: true,
    attributes: {
      occasions: ['Work', 'Formal'],
      styles: ['Minimal', 'Classic'],
      color: 'Charcoal Grey',
      colorFamily: 'Dark',
      fabric: 'Poly Viscose',
      fit: 'Slim',
      formality: 'Ultra Formal',
      isFlashy: false,
      tags: ['trousers', 'formal', 'work wear', 'office', 'charcoal', 'men']
    }
  },
  {
    id: 'prod-22',
    brand: 'Tommy Hilfiger',
    title: 'Navy Blue Solid Casual Oxford Shirt',
    description: 'Iconic button-down collar Oxford shirt crafted from 100% organic cotton featuring the signature flag embroidery on chest.',
    category: 'Men',
    subCategory: 'Western Wear',
    price: 3999,
    originalPrice: 5999,
    discountPercentage: 33,
    rating: 4.7,
    ratingCount: 880,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCsuU7XZLew7TPOAt10TmqCfbGOovjKXxmANOiGoCkqlTMovA5c9-F2R2lEzw4cCaMfrRbR4fweA-RVS5QTINQ0YGGcoWIpvF5XuPs0eQe-xZTmn9NtjxgglfjaAHFjHnKIil9YaJ0BGN0-nwkbn2bcclamAn7VNeqhATva0BzPG3j9Vhuqmwl6FALlnYaOgV5qNZE-qKnaISzO2nhnJQDzJ4T14DEDnxvI5MDxI13CnOhj1NBUrDUJ'
    ],
    sizes: ['M', 'L', 'XL'],
    inStock: true,
    attributes: {
      occasions: ['Work', 'Casual'],
      styles: ['Classic', 'Casual'],
      color: 'Navy Blue',
      colorFamily: 'Dark',
      fabric: 'Oxford Cotton',
      fit: 'Regular',
      formality: 'Smart Casual',
      isFlashy: false,
      tags: ['shirt', 'oxford', 'navy', 'casual', 'premium', 'men']
    }
  }
];

// Initial pre-saved wishlist items (19 items matching the Stitch prototype)
export const INITIAL_WISHLIST_IDS = [
  'prod-01', 'prod-02', 'prod-03', 'prod-04', 'prod-05', 
  'prod-06', 'prod-07', 'prod-08', 'prod-09', 'prod-10', 
  'prod-11', 'prod-12', 'prod-13', 'prod-14', 'prod-15', 
  'prod-16', 'prod-17', 'prod-18', 'prod-19'
];
