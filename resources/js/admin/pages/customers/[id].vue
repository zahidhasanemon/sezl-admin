<script setup>
import { useAppStore } from "@/stores";

const appStore = useAppStore();
const route = useRoute('customers-id');

const { data: customerResponse, execute: fetchCustomer } = await useApi(`/customers/${route.params.id}`);
const customerData = computed(() => customerResponse.value?.data?.customer || null);

const formatPhone = (phone) => phone || 'N/A';

definePage({
  meta: {
    navActiveLink: 'customers',
    title: 'Customer Detail',
  },
})

const avatarText = (name) => {
  if (!name) return "";
  return name.split(" ").map(n => n[0]).join("").toUpperCase();
};

const rightTabs = computed(() => [
  {
    icon: 'tabler-map-pin',
    value: 'addresses',
    label: 'Addresses',
    count: customerData.value?.user_addresses?.length || 0,
  },
  {
    icon: 'tabler-list-details',
    value: 'orders',
    label: 'Orders',
    count: customerData.value?.orders?.length || 0,
  },
  {
    icon: 'tabler-heart',
    value: 'wishlists',
    label: 'Wishlists',
    count: customerData.value?.wishlists?.length || 0,
  },
  {
    icon: 'tabler-shopping-cart',
    value: 'carts',
    label: 'Carts',
    count: customerData.value?.carts?.length || 0,
  },
]);

const rightTab = ref(rightTabs.value[0].value);

const resolveStatus = status => {
  if (status === 'delivered')
    return { text: 'Delivered', color: 'success' }
  if (status === 'in_transit')
    return { text: 'In Transit', color: 'primary' }
  if (status === 'processing')
    return { text: 'Processing', color: 'info' }
  if (status === 'confirmed')
    return { text: 'Confirmed', color: 'primary' }
  if (status === 'pending')
    return { text: 'Pending', color: 'warning' }
  if (status === 'cancelled')
    return { text: 'Cancelled', color: 'error' }
  return { text: status, color: 'secondary' }
};
</script>

<template>
  <div v-if="customerData">
    <VRow>
      <VCol cols="12" md="4">
        <!-- 👉 Customer Details -->
        <VCard class="mb-6">
          <VCardText>
            <div class="d-flex justify-center mb-4">
              <VAvatar size="120" rounded="lg" :color="!customerData.avatar ? 'primary' : undefined" variant="tonal">
                <VImg v-if="customerData.avatar" :src="customerData.avatar" />
                <span v-else class="text-h3">{{ avatarText(customerData.full_name) }}</span>
              </VAvatar>
            </div>
            <h5 class="text-h5 text-center mb-2">
              {{ customerData.full_name }}
            </h5>
            <VDivider class="my-4" />
            <div class="d-flex flex-column gap-3">
              <div class="d-flex align-center justify-space-between">
                <span class="text-body-2 text-medium-emphasis">Customer ID:</span>
                <span class="text-body-1">#{{ customerData.id }}</span>
              </div>
              <div class="d-flex align-center justify-space-between">
                <span class="text-body-2 text-medium-emphasis">Email:</span>
                <span class="text-body-1">{{ customerData.email }}</span>
              </div>
              <div class="d-flex align-center justify-space-between">
                <span class="text-body-2 text-medium-emphasis">Phone:</span>
                <span class="text-body-1">{{ formatPhone(customerData.phone) }}</span>
              </div>
              <div class="d-flex align-center justify-space-between">
                <span class="text-body-2 text-medium-emphasis">DOB:</span>
                <span class="text-body-1">{{ customerData.dob || 'N/A' }}</span>
              </div>
              <div class="d-flex align-center justify-space-between">
                <span class="text-body-2 text-medium-emphasis">Order Count:</span>
                <span class="text-body-1">{{ customerData.order_count }}</span>
              </div>
              <div class="d-flex align-center justify-space-between">
                <span class="text-body-2 text-medium-emphasis">Order Total:</span>
                <span class="text-body-1">{{ customerData.order_total }}</span>
              </div>
              <div class="d-flex align-center justify-space-between">
                <span class="text-body-2 text-medium-emphasis">Status:</span>
                <VChip variant="tonal" :color="customerData.status === 1 ? 'success' : 'error'" label size="small">
                  {{ customerData.status_text }}
                </VChip>
              </div>
              <div class="d-flex align-center justify-space-between">
                <span class="text-body-2 text-medium-emphasis">Email Verified:</span>
                <VChip variant="tonal" :color="customerData.email_verified_at ? 'success' : 'error'" label size="small">
                  {{ customerData.email_verified_at ? 'Verified' : 'Unverified' }}
                </VChip>
              </div>
              <div class="d-flex align-center justify-space-between">
                <span class="text-body-2 text-medium-emphasis">Created At:</span>
                <span class="text-body-1">{{ customerData.created_at }}</span>
              </div>
            </div>
          </VCardText>
        </VCard>
      </VCol>

      <VCol cols="12" md="8">
        <!-- 👉 Tabs menu outside the card -->
        <VTabs v-model="rightTab" class="v-tabs-pill mb-4">
          <VTab v-for="tab in rightTabs" :key="tab.value" :value="tab.value">
            <VIcon :size="18" :icon="tab.icon" class="me-1" />
            <span>{{ tab.label }}</span>
            <VChip variant="tonal" :color="rightTab === tab.value ? 'white' : 'primary'" label size="x-small"
              class="ms-2">
              {{ tab.count }}
            </VChip>
          </VTab>
        </VTabs>

        <VCard class="mb-6">
          <VWindow v-model="rightTab" class="mt-6 disable-tab-transition" :touch="false">
            <VWindowItem value="orders">
              <VTable>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Total Amount</th>
                    <th>Status</th>
                    <th>Platform</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(order, idx) in customerData.orders" :key="order.id">
                    <td>#{{ order.id }}</td>
                    <td>{{ order.total_amount }}</td>
                    <td>
                      <VChip :color="resolveStatus(order.status)?.color" label size="small">
                        {{ resolveStatus(order.status)?.text }}
                      </VChip>
                    </td>
                    <td>{{ order.platform }}</td>
                    <td>{{ order.created_at }}</td>
                    <td>{{ order.updated_at }}</td>
                  </tr>
                  <tr v-if="!customerData.orders || customerData.orders.length === 0">
                    <td colspan="6">No orders found.</td>
                  </tr>
                </tbody>
              </VTable>
            </VWindowItem>

            <VWindowItem value="addresses">
              <VTable>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Title</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Zip</th>
                    <th>Country</th>
                    <th>Default</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(address, idx) in customerData.user_addresses" :key="address.id">
                    <td>{{ idx + 1 }}</td>
                    <td>{{ address.name }}</td>
                    <td>{{ address.title }}</td>
                    <td>{{ address.city }}</td>
                    <td>{{ address.state }}</td>
                    <td>{{ address.zip }}</td>
                    <td>{{ address.country }}</td>
                    <td>
                      <VChip :color="address.is_default ? 'primary' : 'default'" label size="x-small">
                        {{ address.is_default ? 'Yes' : 'No' }}
                      </VChip>
                    </td>
                  </tr>
                  <tr v-if="!customerData.user_addresses || customerData.user_addresses.length === 0">
                    <td colspan="8">No addresses found.</td>
                  </tr>
                </tbody>
              </VTable>
            </VWindowItem>

            <VWindowItem value="wishlists">
              <VTable>
                <thead>
                  <tr>
                    <th style="inline-size: 60px;">#</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, idx) in customerData.wishlists" :key="item.id">
                    <td>{{ idx + 1 }}</td>
                    <td>
                      <VAvatar size="38">
                        <VImg v-if="item.image" :src="item.image" />
                      </VAvatar>
                    </td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.category_name }}</td>
                    <td>{{ item.price }}</td>
                    <td>{{ item.created_at }}</td>
                  </tr>
                  <tr v-if="!customerData.wishlists || customerData.wishlists.length === 0">
                    <td colspan="6">No wishlist items found.</td>
                  </tr>
                </tbody>
              </VTable>
            </VWindowItem>

            <VWindowItem value="carts">
              <VTable>
                <thead>
                  <tr>
                    <th style="inline-size: 60px;">#</th>
                    <th>Image</th>
                    <th>Product Name</th>
                    <th>Variation</th>
                    <th>Price</th>
                    <th>Final Price</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(cart, idx) in customerData.carts" :key="cart.id">
                    <td>{{ idx + 1 }}</td>
                    <td>
                      <VAvatar size="38">
                        <VImg v-if="cart.default_image" :src="cart.default_image" />
                      </VAvatar>
                    </td>
                    <td>{{ cart.product_name }}</td>
                    <td>
                      <div v-for="attr in cart.variation_attributes" :key="attr.attribute_id">
                        <span>{{ attr.attribute_name }}: {{ attr.attribute_item_name }}</span>
                      </div>
                    </td>
                    <td>{{ cart.price }}</td>
                    <td>{{ cart.final_price }}</td>
                    <td>{{ cart.quantity }}</td>
                    <td>{{ cart.total_price }}</td>
                  </tr>
                  <tr v-if="!customerData.carts || customerData.carts.length === 0">
                    <td colspan="8">No cart items found.</td>
                  </tr>
                </tbody>
              </VTable>
            </VWindowItem>

            <VWindowItem value="device_tokens">
              <VTable>
                <thead>
                  <tr>
                    <th style="inline-size: 60px;">#</th>
                    <th>Token</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(token, idx) in customerData.device_tokens" :key="idx">
                    <td>{{ idx + 1 }}</td>
                    <td class="text-wrap" style="white-space: pre-line; word-break: break-all;">{{ token }}</td>
                  </tr>
                  <tr v-if="!customerData.device_tokens || customerData.device_tokens.length === 0">
                    <td colspan="2">No device tokens found.</td>
                  </tr>
                </tbody>
              </VTable>
            </VWindowItem>
          </VWindow>
        </VCard>
      </VCol>
    </VRow>
  </div>
  <div v-else class="text-center pa-6">
    <VProgressCircular indeterminate color="primary" />
  </div>
</template>
