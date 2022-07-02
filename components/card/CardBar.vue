<template>
  <section>
    <!--是否登录-->
    <login-welcome />

    <!--今日赠言-->
    <tip-card />

    <!--资源推介-->
    <PromotionCard />
  </section>
</template>

<script>
import TipCard from '@/components/card/Tip'
import PromotionCard from '@/components/card/Promotion'
import LoginWelcome from '@/components/card/LoginWelcome'

export default {
  name: 'CardBar',
  components: { LoginWelcome, PromotionCard, TipCard }
}
</script>

<style scoped>
</style>
