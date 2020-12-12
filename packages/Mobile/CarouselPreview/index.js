import CarouselPreview from './src/infra-carousel-preview.vue';

CarouselPreview.install = function (Vue) {
  Vue.component(CarouselPreview.name, CarouselPreview);
};

export default CarouselPreview;
