CREATE DATABASE  IF NOT EXISTS `sgicore` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `sgicore`;
-- MySQL dump 10.13  Distrib 5.5.32, for debian-linux-gnu (x86_64)
--
-- Host: 127.0.0.1    Database: sgicore
-- ------------------------------------------------------
-- Server version	5.5.32-0ubuntu0.13.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer` (
  `custid` int(11) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `company` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `state` varchar(2) DEFAULT NULL,
  `zip` varchar(9) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `web` varchar(45) DEFAULT NULL,
  `res` varchar(45) DEFAULT NULL,
  `fax` varchar(20) DEFAULT NULL,
  `sec` varchar(20) DEFAULT NULL,
  `lastStat` varchar(45) DEFAULT NULL,
  `ccNum` varchar(16) DEFAULT NULL,
  `ccCVC` varchar(4) DEFAULT NULL,
  `ccStreet` varchar(45) DEFAULT NULL,
  `ccZip` varchar(5) DEFAULT NULL,
  `receivedDt` date DEFAULT NULL,
  `receviedAmt` varchar(45) DEFAULT NULL,
  `shipd` date DEFAULT NULL,
  `cycle` varchar(45) DEFAULT NULL,
  `orderHist` varchar(45) DEFAULT NULL,
  `adCopy` varchar(45) DEFAULT NULL,
  `notes` varchar(45) DEFAULT NULL,
  `custHist` blob,
  `SIC` varchar(45) DEFAULT NULL,
  `cpmSrc` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`custid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `accessList`
--

DROP TABLE IF EXISTS `accessList`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accessList` (
  `ruleid` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `menuItem` varchar(10) DEFAULT NULL,
  `access` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ruleid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `prodid` int(11) NOT NULL,
  `code` varchar(10) DEFAULT NULL,
  `enteredDt` date DEFAULT NULL,
  `enteredBy` varchar(45) DEFAULT NULL,
  `desc` varchar(45) DEFAULT NULL,
  `shipChrgLvl` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`prodid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `userid` int(11) NOT NULL,
  `login` varchar(45) DEFAULT NULL,
  `firstName` varchar(45) DEFAULT NULL,
  `lastName` varchar(45) DEFAULT NULL,
  `encryptedPass` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `mobile` int(11) DEFAULT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employee` (
  `empid` int(11) NOT NULL,
  `salesID` varchar(45) DEFAULT NULL,
  `startDt` varchar(45) DEFAULT NULL,
  `firstName` varchar(45) DEFAULT NULL,
  `lastName` varchar(45) DEFAULT NULL,
  `ssn` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `zip` varchar(45) DEFAULT NULL,
  `dob` varchar(45) DEFAULT NULL,
  `married` varchar(45) DEFAULT NULL,
  `salary` varchar(45) DEFAULT NULL,
  `office` varchar(45) DEFAULT NULL,
  `teamLeaders` varchar(45) DEFAULT NULL,
  `level` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`empid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `orderid` int(11) NOT NULL,
  `orderNum` varchar(45) DEFAULT NULL,
  `custid` int(11) DEFAULT NULL,
  `company` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `csZip` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `salesId` int(11) DEFAULT NULL,
  `payDt` date DEFAULT NULL,
  `orderDt` date DEFAULT NULL,
  `useOrderAdd` varchar(45) DEFAULT NULL,
  `custType` varchar(45) DEFAULT NULL,
  `new` varchar(45) DEFAULT NULL,
  `cycle` varchar(45) DEFAULT NULL,
  `priceType` varchar(45) DEFAULT NULL,
  `logo` varchar(45) CHARACTER SET big5 DEFAULT NULL,
  `toRep` varchar(45) DEFAULT NULL,
  `toComm` varchar(45) DEFAULT NULL,
  `qty` varchar(45) DEFAULT NULL,
  `prod` varchar(45) DEFAULT NULL,
  `desc` varchar(45) DEFAULT NULL,
  `price` varchar(45) DEFAULT NULL,
  `lineTotal` varchar(45) DEFAULT NULL,
  `chrgBacks` varchar(45) DEFAULT NULL,
  `cbDate` date DEFAULT NULL,
  `cbAmt` varchar(45) DEFAULT NULL,
  `spgPar` varchar(45) DEFAULT NULL,
  `shipping` varchar(45) DEFAULT NULL,
  `invTotal` varchar(45) DEFAULT NULL,
  `crCard` varchar(45) DEFAULT NULL,
  `ocRec` varchar(45) DEFAULT NULL,
  `comments` varchar(45) DEFAULT NULL,
  `ccRepNts` varchar(45) DEFAULT NULL,
  `ow` varchar(45) DEFAULT NULL,
  `origComm` varchar(45) DEFAULT NULL,
  `netComm` varchar(45) DEFAULT NULL,
  `tracking` varchar(45) DEFAULT NULL,
  `tjDate` date DEFAULT NULL,
  `tjResolve` varchar(45) DEFAULT NULL,
  `cancel` varchar(45) DEFAULT NULL,
  `actual` varchar(45) DEFAULT NULL,
  `rush` varchar(45) DEFAULT NULL,
  `shipVia` varchar(45) DEFAULT NULL,
  `res` varchar(45) DEFAULT NULL,
  `typeSet` varchar(45) DEFAULT NULL,
  `tsd2` varchar(45) DEFAULT NULL,
  `ship` varchar(45) DEFAULT NULL,
  `return` varchar(45) DEFAULT NULL,
  `reShip` varchar(45) DEFAULT NULL,
  `reDate` date DEFAULT NULL,
  `rePrice` varchar(45) DEFAULT NULL,
  `reWeight` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`orderid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2013-09-14 15:58:43
