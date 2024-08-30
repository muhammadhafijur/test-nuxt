import { useFetch } from '#app';
import { ref } from 'vue';

const showPreview = ref(true);
const aspectRatio = ref('square');
const bgLayerOpacity = ref(40);
const bgLayerColor = ref('#00C16A');
const mixBlendValue = ref('normal');
const sliderBackground = ref('');

const useImageControls = () => {
  const { data, refresh } = useFetch('/api/count');

  const updateCount = async () => {
    try {
      if (data.value) {
        const currentCount = data.value.count;
        const updatedCount = currentCount + 1;
        await $fetch('/api/count', {
          method: 'POST',
          body: { count: updatedCount }
        });
        await refresh(); // Refresh the count from the API
      }
    } catch (error) {
      console.error('Error updating count:', error);
    }
  };

  return { updateCount, data };
};

export default useImageControls;
