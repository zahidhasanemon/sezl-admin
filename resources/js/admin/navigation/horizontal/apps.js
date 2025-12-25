export default [
  {
    title: 'Products',
    icon: { icon: 'tabler-brand-producthunt' },
    children: [
      { title: 'List', to: 'apps-ecommerce-product-list' },
      { title: 'Add', to: 'apps-ecommerce-product-add' },
      { title: 'Category', to: 'apps-ecommerce-product-category-list' },
    ]
  },
  {
    title: 'Orders',
    icon: { icon: 'tabler-shopping-cart' },
    children: [
      { title: 'List', to: 'apps-ecommerce-order-list' },
      { title: 'Details', to: { name: 'apps-ecommerce-order-details-id', params: { id: '9042' } } },
    ]
  },
  {
    title: 'Orders',
    icon: { icon: 'tabler-shopping-cart' },
    children: [
      { title: 'List', to: 'apps-ecommerce-order-list' },
      { title: 'Details', to: { name: 'apps-ecommerce-order-details-id', params: { id: '9042' } } },
    ]
  },
  {
    title: 'User',
    icon: { icon: 'tabler-user' },
    children: [
      { title: 'List', to: 'apps-user-list' },
      { title: 'View', to: { name: 'apps-user-view-id', params: { id: 21 } } },
    ],
  },
  {
    title: 'CMS',
    icon: { icon: 'tabler-cast' },
    children: [
      {
        title: 'Manage Review',
        to: 'apps-ecommerce-manage-review',
      },
    ],
  },
]
