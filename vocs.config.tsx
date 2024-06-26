import { defineConfig } from 'vocs'

export default defineConfig({
  title: 'ERC-7677',
  titleTemplate: '%s · ERC-7677',
  description: 'Standards for unlocking sponsored transactions',
  ogImageUrl: 'https://vocs.dev/api/og?title=%title&description=%description',
  head() {
    return (
      <>
        <script
          dangerouslySetInnerHTML={{ __html: 'window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };'}}
        />
        <script defer src="/_vercel/insights/script.js" />
      </>
    )
  },
  theme: {
    accentColor: {
      light: '#73F7FF',
      dark: '#73F7FF',
    },
    variables: {
      color: {
        background: {
          light: 'white',
          dark: '#151A26',
        },
        backgroundDark: {
          light: '#F5F5F5',
          dark: '#0F131E',
        },
        textAccent: {
          light: '#050F19',
          dark: 'white',
        },
      },
    },
  },
  topNav: [ 
    { text: 'ERC', link: 'https://github.com/ethereum/ERCs/pull/360' }, 
  ], 
  sidebar: [
    {
      text: 'Introduction',
      link: '/introduction',
    },
    {
      text: 'Getting Started',
      link: '/getting-started',
    },
    {
      text: 'Guides',
      collapsed: false,
      items: [
        {
          text: "Sponsoring your users' transactions",
          link: '/guides/sponsoring-transactions',
        },
        {
          text: 'Constructing a user operation with ERC-7677',
          link: '/guides/construct-user-op-with-7677',
        }
      ]
    },
    { 
      text: 'Reference', 
      collapsed: false, 
      items: [ 
        {
          text: 'Paymaster Services',
          items: [
            {
              text: 'pm_getPaymasterStubData',
              link: '/reference/paymasters/getPaymasterStubData'
            },
            {
              text: 'pm_getPaymasterData',
              link: '/reference/paymasters/getPaymasterData'
            }
          ]
        },
        {
          text: 'Wallets',
          items: [
            {
              text: 'wallet_getCapabilities Behavior',
              link: '/reference/wallets/getCapabilities'
            },
            {
              text: 'wallet_sendCalls Behavior',
              link: '/reference/wallets/sendCalls'
            }
          ]
        },
        {
          text: 'Apps',
          items: [
            {
              text: 'wallet_sendCalls Usage',
              link: '/reference/apps/sendCalls'
            },
            {
              text: 'wallet_getCapabilities Usage',
              link: '/reference/apps/getCapabilities'
            },
          ]
        },
      ], 
    },
    { 
      text: 'Ecosystem', 
      collapsed: false, 
      items: [ 
        { 
          text: 'Paymaster Service Providers', 
          link: '/ecosystem/paymasters', 
        },
        { 
          text: 'Wallets', 
          link: '/ecosystem/wallets', 
        },
        {
          text: 'Tools',
          link: '/ecosystem/tools',
        },
      ], 
    },
  ],
})
