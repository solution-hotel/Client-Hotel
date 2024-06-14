import { fetcher } from "@/app/utils/fetcher";
import useSWR from "swr";

const useAdditionalData = (url: string) => {
    const { data, error } = useSWR(`https://api-pnv.bluejaypos.vn/extraitems/getall`, fetcher);

    return {
        additionalData: data,
        isAdditionalDataLoading: !error && !data,
        additionalDataError: error
    };
}