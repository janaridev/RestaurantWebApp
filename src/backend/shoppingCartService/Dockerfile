FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

WORKDIR /app

COPY ./api/api.csproj ./api/
COPY ./presentation/presentation.csproj ./presentation/
COPY ./infrastructure/infrastructure.csproj ./infrastructure/
COPY ./domain/domain.csproj ./domain/
COPY ./build.proj .

RUN dotnet restore

COPY . .

RUN dotnet publish ./api/api.csproj -o /publish/

WORKDIR /publish

ENV ASPNETCORE_URLS="http://0.0.0.0:3040"

ENTRYPOINT [ "dotnet", "api.dll" ]