import Image from 'next/image';

export const Discord = () => {
  return (
    <Image
      src={'/discord.svg'}
      alt="discord_logo"
      width={'80'}
      height={'80'}
      className="group-hover:scale-[1.2]"
      loading="lazy"
    />
  );
};
export const Twitter = () => {
  return (
    <Image
      src={'/twitter.svg'}
      alt="twitter_logo"
      width={'80'}
      height={'80'}
      className="group-hover:scale-[1.2]"
      loading="lazy"
    />
  );
};
