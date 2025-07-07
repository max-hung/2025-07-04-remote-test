import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AsideMenu from '@/components/aside/AsideMenu.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

describe('AsideMenu.vue', async () => {
  type MenuItem = {
    label: string
    icon: [string, string]
  }

  const menuItems: MenuItem[] = [
    { label: 'Home', icon: ['fas', 'house'] as const },
    { label: 'Profile', icon: ['fas', 'user'] as const },
  ]

  const factory = (isShow = true) =>
    mount(AsideMenu, {
      props: {
        isShow,
        menuItems,
      },
      global: {
        components: {
          FontAwesomeIcon,
        },
        stubs: {
          FontAwesomeIcon: {
            template: '<svg @click="$emit(\'click\')" class="close-icon"></svg>',
          },
        },
      },
    })

  it('正確渲染選單項目', () => {
    const wrapper = factory()
    const items = wrapper.findAll('li')
    expect(items).toHaveLength(2)
    expect(items[0].text()).toContain('Home')
    expect(items[1].text()).toContain('Profile')
  })

  it('點擊關閉圖示時會觸發 close 事件', async () => {
    const wrapper = factory()
    const closeIcon = wrapper.find('.close-icon')
    await closeIcon.trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('當 isShow 為 true 套用 translate-x-0', () => {
    const wrapper = factory(true)
    expect(wrapper.classes()).toContain('translate-x-0')
  })

  it('當 isShow 為 false 套用 -translate-x-52', () => {
    const wrapper = factory(false)
    expect(wrapper.classes()).toContain('-translate-x-52')
  })

})
