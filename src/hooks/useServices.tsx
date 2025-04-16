import { getServices } from "@/services/admin/services";
import { useServiceStore } from "@/stores/service-store";
import { useUserStore } from "@/stores/user-store";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function useServices() {
  const { services, update } = useServiceStore();
  const { user } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  function fetch() {
    if (!user?.company?.id) {
      return;
    }
    setIsLoading(true);
    getServices(user.company.id)
      .then((services) => {
        update(services);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error("Erro ao buscar serviços");
      });
  }
  useEffect(() => {
    fetch();
  }, [user]);

  return { services, servicesLoading: isLoading };
}
