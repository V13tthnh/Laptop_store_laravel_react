import { ColorRing } from "react-loader-spinner";

export default function useLoading(isLoading) {
  if (isLoading) {
    return (
      <>
        <ColorRing
          visible={true}
          height="35"
          width="35"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
        />
      </>
    );
  }
}
