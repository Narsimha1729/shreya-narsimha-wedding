import { I18nProvider } from './i18n-provider';

export const LangProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <I18nProvider>{children}</I18nProvider>;
};
