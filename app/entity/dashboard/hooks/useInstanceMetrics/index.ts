type InstanceData = {
  isEnabled: boolean;
};

export function useInstanceMetrics(queryInstance: any) {
  const instanceData = queryInstance.data || [];

  const quantityActiveInstance =
    instanceData.filter((instance: InstanceData) => instance.isEnabled).length || 0;

  const quantityInactiveInstance =
    instanceData.filter((instance: InstanceData) => !instance.isEnabled).length || 0;

  return { quantityActiveInstance, quantityInactiveInstance };
}
