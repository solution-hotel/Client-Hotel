import { fetcher } from "@/app/utils/fetcher";
import useSWR from "swr";

const useAdditionalData = (url: string) => {
    const { data, error } = useSWR(`http://192.168.1.114:83/extraitems/getall`, fetcher);

    return {
        additionalData: data,
        isAdditionalDataLoading: !error && !data,
        additionalDataError: error
    };
}