using System.Collections.Generic;
using IdentityModel;
using IdentityServer4;
using IdentityServer4.Models;
using Schwarzenegger.Core;

namespace Schwarzenegger
{
    public static class IdentityServerConfig
    {
        public const string SchwarzeneggerAppClientId = "schwarzenegger_spa";

        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new[]
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
                new IdentityResources.Phone(),
                new IdentityResources.Email(),
                new IdentityResource(ScopeConstants.Roles, new List<string> {JwtClaimTypes.Role})
            };
        }

        /// <summary>
        ///     Ez mondja meg milyen API-kat érhetnek el
        /// </summary>
        /// <returns></returns>
        public static IEnumerable<ApiResource> GetApis()
        {
            return new[]
            {
                new ApiResource(IdentityConfigConstants.ApiName)
                {
                    UserClaims =
                    {
                        JwtClaimTypes.Name,
                        JwtClaimTypes.Email,
                        JwtClaimTypes.PhoneNumber,
                        JwtClaimTypes.Role,
                        ClaimConstants.Permission
                    }
                }
            };
        }

        /// <summary>
        ///     Ez mondja meg milyen alkalmazások csatlakozhatnak és azok melyik API-kat érhetik el
        /// </summary>
        /// <returns></returns>
        public static IEnumerable<Client> GetClients()
        {
            return new[]
            {
                new Client
                {
                    ClientId = SchwarzeneggerAppClientId,
                    AllowedGrantTypes = GrantTypes.ResourceOwnerPassword, // Resource Owner Password Credential grant.
                    AllowAccessTokensViaBrowser = true,
                    RequireClientSecret =
                        false, // This client does not need a secret to request tokens from the token endpoint.

                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId, // For UserInfo endpoint.
                        IdentityServerConstants.StandardScopes.Profile,
                        IdentityServerConstants.StandardScopes.Phone,
                        IdentityServerConstants.StandardScopes.Email,
                        ScopeConstants.Roles,
                        IdentityConfigConstants.ApiName
                    },
                    AllowOfflineAccess = true, // For refresh token.
                    
                    RefreshTokenExpiration = TokenExpiration.Sliding,
                    RefreshTokenUsage = TokenUsage.OneTimeOnly,
                    AccessTokenLifetime = 20, // Lifetime of access token in seconds.
                    //AbsoluteRefreshTokenLifetime = 7200,
                    //SlidingRefreshTokenLifetime = 900,+
                    //ClientSecrets =
                    //{
                    //    new Secret("secret".Sha256())
                    //},
                    AllowedCorsOrigins = { "https://localhost:44301" }
                },

                new Client
                {
                    ClientId = IdentityConfigConstants.SwaggerClientId,
                    ClientName = "Swagger UI",
                    AllowedGrantTypes = GrantTypes.ResourceOwnerPassword,
                    AllowAccessTokensViaBrowser = true,
                    RequireClientSecret = false,
                    //AllowedCorsOrigins = { "https://localhost:44300" },
                    AllowedScopes =
                    {
                        IdentityConfigConstants.ApiName
                    }
                }
            };
        }
    }
}