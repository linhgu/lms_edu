/* eslint-disable @next/next/no-img-element */

export const CompaniesPages = () => {
  const companyList = [
    {
      id: 1,
      imageUrl: 'https://assets.website-files.com/6279827ac63c5f7775cc5b91/6279827ac63c5f5e21cc5bfd_Dune.svg',
    },
    {
      id: 2,
      imageUrl: 'https://assets.website-files.com/6279827ac63c5f7775cc5b91/6279827ac63c5f985dcc5bfe_Blossom.svg',
    },
    {
      id: 3,
      imageUrl: 'https://assets.website-files.com/6279827ac63c5f7775cc5b91/6279827ac63c5f650ecc5bff_Penta.svg',
    },
    {
      id: 4,
      imageUrl: 'https://assets.website-files.com/6279827ac63c5f7775cc5b91/6279827ac63c5f07c2cc5c00_Pinpoint.svg',
    },
    {
      id: 5,
      imageUrl: 'https://assets.website-files.com/6279827ac63c5f7775cc5b91/6279827ac63c5f916dcc5c05_luminous.svg',
    },
    {
      id: 6,
      imageUrl: 'https://assets.website-files.com/6279827ac63c5f7775cc5b91/6279827ac63c5f8e73cc5c06_Terra.svg',
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center ">
      <h1 className=" text-center font-bold text-[22.5px] sm:text-[26px] md:text-[44px] md:text-start  text-[#e66bba] ">
        Được sử dụng bởi các công ty hàng đầu trên thế giới
      </h1>
      <div className="grid grid-cols-3 items-center justify-between">
        {companyList.map((item) => (
          <div key={item.id}>
            <img src={item.imageUrl} className="opacity-[0.6] h-[80px] w-[240px]" alt="#" />
          </div>
        ))}
      </div>
    </div>
  );
};
