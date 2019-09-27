using Abp.Configuration.Startup;
using Abp.Localization.Dictionaries;
using Abp.Localization.Dictionaries.Xml;
using Abp.Reflection.Extensions;

namespace HinnovaAbp.Localization
{
    public static class HinnovaAbpLocalizationConfigurer
    {
        public static void Configure(ILocalizationConfiguration localizationConfiguration)
        {
            localizationConfiguration.Sources.Add(
                new DictionaryBasedLocalizationSource(HinnovaAbpConsts.LocalizationSourceName,
                    new XmlEmbeddedFileLocalizationDictionaryProvider(
                        typeof(HinnovaAbpLocalizationConfigurer).GetAssembly(),
                        "HinnovaAbp.Localization.SourceFiles"
                    )
                )
            );
        }
    }
}
