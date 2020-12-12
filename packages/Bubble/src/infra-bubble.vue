<template>
  <div class="bubble-wrapper">
    <audio preload="auto" ref="audio" hidden controls @canplaythrough="countTime" @play="openPlaying" @pause="pausePlaying"><source :src="voiceSrc" type="audio/wav"></audio>
    <div class="voice" @click="handlePlay" v-if="time">
      <div class="bg" ref="playing"></div>
      <span class="time">{{time}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'infra-bubble',
    props: {
      voiceSrc:{
        type: String,
        default: ''
      }
    },
    data() {
      return {
        isPlay: false,
        audioNativeTime: '',
        time: ''
      }
    },
    methods: {
      openPlaying(){
        this.$refs.playing.className = 'bg voicePlay';
      },
      pausePlaying(){
        this.$refs.playing.className = 'bg';
      },
      handlePlay(){
        let audio = this.$refs.audio;
        this.isPlay = !this.isPlay;
        if(this.isPlay){
          //每次播放的时候重新加载一次，这样和市场上主流的做法一样。
          audio.load();
          audio.play();
        }else{
          audio.pause();
        }
      },
      countTime(){
        if(!this.$refs.audio){
          this.time = `00'00''`;
        }
        let tempTime = this.$refs.audio.duration;
        this.audioNativeTime = tempTime;
        let hour = '';
        let minute = '';
        let second = '';
        hour = parseInt(tempTime/3600);
        minute = parseInt(tempTime%3600/60);
        second = parseInt(tempTime%60);
        if(hour < 10){
          hour = '0'+hour;
        }
        if(minute < 10){
          minute = '0'+minute;
        }
        if(second < 10){
          second = '0'+second;
        }
        //this.time = `[${hour}]${minute}'${second}''`;
        this.time = `${minute}'${second}''`;
      }
    }
  }
</script>

<style scoped>
  .bubble-wrapper{
    width: 200px;
    height: 40px;
  }
  .voice{
    display: flex;
    align-items: center;
    height: 38px;
    width: 175px;
    box-sizing: border-box;
    padding-left: 26px;
    background: #CDD4E1;
    border-radius: 20px;
  }
  .voice:hover{
    cursor: pointer;
  }
  .bg {
    background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAYCAYAAAAF6fiUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzlFRDZDRDNENzlFMTFFNkJDN0NFMjA2QTFFRTRDQkIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzlFRDZDRDJENzlFMTFFNkJDN0NFMjA2QTFFRTRDQkIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTAxQkEzQ0RENzM2MTFFNjgyMEI5MTNDRkQ0OTM5QUEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTAxQkEzQ0VENzM2MTFFNjgyMEI5MTNDRkQ0OTM5QUEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4K4iKVAAACUUlEQVR42uSazytEURTHvTHjR4kaU8xsSDZSdmbjx4oSK8XGQrJlpSwYTSmxEWWhUIpsZK3kD7DRNBuSBZFCNjZ+JPKcV6ecXu/d3sy7595bc+vbfXPue5/749z77o83lm3bZYYFC8RZqAbQAigP2tXNj5aZF7gdkAZNk9+7WvnOCCgxRUCb9n/o1sk3pUH6QDHF/GNsoM+QeYfiy6qkFeLZDBb0GlTB4AAR/xXT9nXxZVa0WCekQd9Y0HOJjg3CHySviiZmfjO3AyIhnu0gBc0wjAIR/wLtW8z87aAOWAI9gqaYRoAff4ZUoi7EKCiUP462j4CdSCrfK4N1Ahpi6I0i/hPa50M4oFB+Dbm/SzXfL5MD4rUogxP8+Itozynm59E+q5ovyuQdHxphWh568XvR5kxq1SEn40L4e0XMA1L4EcEe7RTjLqYdqRf/gezQUwr5LxjXq+aLHPCFcTmTA7z4tutIQhXfLiJPKXyRA/oxzgW8v9DgxU+S62eF/ATGr6r5fg26Corj9RHD4Z0fvwfjS9CbQn4bxrfK+R6TyzxZNk260solTL4i/g3al10TsMXIryA72T7VfK8MnJO8X9CKy14lafXjxx8jFUsSeyUzfxhtPwHPoqTy/TJJMJzJiPgNpJdsuNJizPwztB/q4JtwHN2KW3sn3HuMOouR30l6bbsOvgkOyGIBnaPbRldalJl/h2knuvgmOKAWNAFKMUz4Iv4O6Z1xXXxTPxtazHy6khnVyS/Fb8IDpHGyuvmWgX9L4Q4toDnQFWhNN/9PgAEAR4w1ULjdCbEAAAAASUVORK5CYII=) right 0 no-repeat;
    width: 24px;
    height: 24px;
    line-height: 24px;
    background-size: 400%;
  }
  .time{
    display: inline-block;
    width: 60px;
    margin-left: 20px;
    color: #fff;
    font-size: 17px;
  }
  .voicePlay {
    animation-name: voicePlay;
    animation-duration: 1s;
    animation-direction: normal;
    animation-iteration-count: infinite;
    animation-timing-function: steps(3);
  }
  @keyframes voicePlay {
    0% {
      background-position: 0;
    }
    100% {
      background-position: 100%;
    }
  }
</style>