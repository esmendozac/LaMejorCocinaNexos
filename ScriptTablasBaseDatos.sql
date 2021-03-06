USE [master]
GO
/****** Object:  Database [LaMejorCocina]    Script Date: 23/09/2020 11:17:09 p. m. ******/
CREATE DATABASE [LaMejorCocina]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'LaMejorCocina', FILENAME = N'/var/opt/mssql/data/LaMejorCocina.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 10%)
 LOG ON 
( NAME = N'LaMejorCocina_log', FILENAME = N'/var/opt/mssql/data/LaMejorCocina_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [LaMejorCocina] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [LaMejorCocina].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [LaMejorCocina] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [LaMejorCocina] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [LaMejorCocina] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [LaMejorCocina] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [LaMejorCocina] SET ARITHABORT OFF 
GO
ALTER DATABASE [LaMejorCocina] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [LaMejorCocina] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [LaMejorCocina] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [LaMejorCocina] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [LaMejorCocina] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [LaMejorCocina] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [LaMejorCocina] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [LaMejorCocina] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [LaMejorCocina] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [LaMejorCocina] SET  DISABLE_BROKER 
GO
ALTER DATABASE [LaMejorCocina] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [LaMejorCocina] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [LaMejorCocina] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [LaMejorCocina] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [LaMejorCocina] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [LaMejorCocina] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [LaMejorCocina] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [LaMejorCocina] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [LaMejorCocina] SET  MULTI_USER 
GO
ALTER DATABASE [LaMejorCocina] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [LaMejorCocina] SET DB_CHAINING OFF 
GO
ALTER DATABASE [LaMejorCocina] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [LaMejorCocina] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [LaMejorCocina] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [LaMejorCocina] SET QUERY_STORE = OFF
GO
USE [LaMejorCocina]
GO
/****** Object:  User [LaMejorCocinaUser]    Script Date: 23/09/2020 11:17:11 p. m. ******/
CREATE USER [LaMejorCocinaUser] FOR LOGIN [LaMejorCocinaUser] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [LaMejorCocinaUser]
GO
ALTER ROLE [db_accessadmin] ADD MEMBER [LaMejorCocinaUser]
GO
ALTER ROLE [db_datareader] ADD MEMBER [LaMejorCocinaUser]
GO
ALTER ROLE [db_datawriter] ADD MEMBER [LaMejorCocinaUser]
GO
/****** Object:  Table [dbo].[Camarero]    Script Date: 23/09/2020 11:17:11 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Camarero](
	[IdCamarero] [int] IDENTITY(1,1) NOT NULL,
	[Nombres] [varchar](200) NOT NULL,
	[Apellido1] [varchar](200) NOT NULL,
	[Apellido2] [varchar](200) NULL,
 CONSTRAINT [PK_Camarero] PRIMARY KEY CLUSTERED 
(
	[IdCamarero] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cliente]    Script Date: 23/09/2020 11:17:11 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cliente](
	[IdCliente] [int] IDENTITY(1,1) NOT NULL,
	[Nombres] [varchar](200) NOT NULL,
	[Apellido1] [varchar](200) NOT NULL,
	[Apellido2] [varchar](200) NULL,
	[Observaciones] [varchar](max) NULL,
 CONSTRAINT [PK_Cliente] PRIMARY KEY CLUSTERED 
(
	[IdCliente] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cocinero]    Script Date: 23/09/2020 11:17:11 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cocinero](
	[IdCocinero] [int] IDENTITY(1,1) NOT NULL,
	[Nombres] [varchar](200) NOT NULL,
	[Apellido1] [varchar](200) NOT NULL,
	[Apellido2] [varchar](200) NULL,
 CONSTRAINT [PK_Cocinero] PRIMARY KEY CLUSTERED 
(
	[IdCocinero] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DetalleFactura]    Script Date: 23/09/2020 11:17:11 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DetalleFactura](
	[IdDetalleFactura] [int] IDENTITY(1,1) NOT NULL,
	[IdFactura] [int] NOT NULL,
	[IdCocinero] [int] NOT NULL,
	[Plato] [varchar](500) NULL,
	[Importe] [varchar](50) NOT NULL,
 CONSTRAINT [PK_DetalleFactura] PRIMARY KEY CLUSTERED 
(
	[IdDetalleFactura] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Factura]    Script Date: 23/09/2020 11:17:11 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Factura](
	[IdFactura] [int] IDENTITY(1,1) NOT NULL,
	[IdCliente] [int] NOT NULL,
	[IdCamarero] [int] NOT NULL,
	[IdMesa] [int] NOT NULL,
	[Fecha] [datetime2](7) NOT NULL,
	[Total] [varchar](50) NULL,
 CONSTRAINT [PK_Factura] PRIMARY KEY CLUSTERED 
(
	[IdFactura] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Mesa]    Script Date: 23/09/2020 11:17:11 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Mesa](
	[IdMesa] [int] IDENTITY(1,1) NOT NULL,
	[NumMaxComensales] [int] NOT NULL,
	[Ubicacion] [varchar](200) NULL,
 CONSTRAINT [PK_Mesa] PRIMARY KEY CLUSTERED 
(
	[IdMesa] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[DetalleFactura]  WITH CHECK ADD  CONSTRAINT [FK_DetalleFactura_Cocinero] FOREIGN KEY([IdCocinero])
REFERENCES [dbo].[Cocinero] ([IdCocinero])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[DetalleFactura] CHECK CONSTRAINT [FK_DetalleFactura_Cocinero]
GO
ALTER TABLE [dbo].[DetalleFactura]  WITH CHECK ADD  CONSTRAINT [FK_DetalleFactura_Factura] FOREIGN KEY([IdFactura])
REFERENCES [dbo].[Factura] ([IdFactura])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[DetalleFactura] CHECK CONSTRAINT [FK_DetalleFactura_Factura]
GO
ALTER TABLE [dbo].[Factura]  WITH CHECK ADD  CONSTRAINT [FK_Factura_Camarero] FOREIGN KEY([IdCamarero])
REFERENCES [dbo].[Camarero] ([IdCamarero])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Factura] CHECK CONSTRAINT [FK_Factura_Camarero]
GO
ALTER TABLE [dbo].[Factura]  WITH CHECK ADD  CONSTRAINT [FK_Factura_Cliente] FOREIGN KEY([IdCliente])
REFERENCES [dbo].[Cliente] ([IdCliente])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Factura] CHECK CONSTRAINT [FK_Factura_Cliente]
GO
ALTER TABLE [dbo].[Factura]  WITH CHECK ADD  CONSTRAINT [FK_Factura_Mesa] FOREIGN KEY([IdMesa])
REFERENCES [dbo].[Mesa] ([IdMesa])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Factura] CHECK CONSTRAINT [FK_Factura_Mesa]
GO
USE [master]
GO
ALTER DATABASE [LaMejorCocina] SET  READ_WRITE 
GO
