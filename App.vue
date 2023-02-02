<script lang="ts">
export default {
  onLaunch: function () {
    plus.screen.lockOrientation('portrait-primary')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  }
}
</script>
