<template>
  <RouterLink
      to="/"
      class="logo">
    <span>OMDbAPI</span>.COM
  </RouterLink>
</template>

<style lang="scss" scoped>

.logo{
  font-family: "Oswald",sans-serif; //되도록이면 폰트는 "" 로 묶어주는것이 좋다.
  font-size: 20px;
  color: $black;
  text-decoration: none;
  &:hover{
    color: $black;
  }
  span{
    color: $primary;
  }
}
</style>