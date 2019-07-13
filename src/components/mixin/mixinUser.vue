<template>
</template>


<script lang="ts">

import AppDownLoad from './component/app-download.vue'
import { Vue, Component, Prop } from 'vue-property-decorator'
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'

const USER = '__user__'
import storage from 'good-storage'

@Component({
})
export default class MixinUser extends Vue {
  @Mutation('SET_USER') setUser:any
  saveUser (user:any) {
    // 保存到vuex里面
    this.setUser(user);
    // 保存到localStorage里面
    storage.set(USER, user);
  }
}
</script>

<style lang="less" scoped>
  @import '~@/style/util.less';
</style>
