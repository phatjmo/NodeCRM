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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `phone` varchar(20) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `company` varchar(45) DEFAULT NULL,
  `address1` varchar(45) DEFAULT NULL,
  `address2` varchar(45) DEFAULT NULL,
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
  `recvdDt` date DEFAULT NULL,
  `recvdAmt` varchar(45) DEFAULT NULL,
  `shipdDt` date DEFAULT NULL,
  `cycle` varchar(45) DEFAULT NULL,
  `orderHist` varchar(45) DEFAULT NULL,
  `adCopy` varchar(45) DEFAULT NULL,
  `notes` varchar(45) DEFAULT NULL,
  `custHist` blob,
  `sicnum` varchar(45) DEFAULT NULL,
  `cpmSrc` varchar(45) DEFAULT NULL,
  `salesprsn` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'4805551212','Name Changed!','Company Co.','','','','','','','','','','','','','','','','0000-00-00','','0000-00-00','',NULL,NULL,NULL,NULL,'','',''),(2,'4805552212','','Company Cro.','','','','','','','','','','','','','','','','0000-00-00','','0000-00-00','',NULL,NULL,NULL,NULL,'','','');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accessList`
--

DROP TABLE IF EXISTS `accessList`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accessList` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `menu` varchar(10) DEFAULT NULL,
  `command` varchar(45) DEFAULT NULL,
  `label` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accessList`
--

LOCK TABLES `accessList` WRITE;
/*!40000 ALTER TABLE `accessList` DISABLE KEYS */;
INSERT INTO `accessList` VALUES (1,1,'mainMenu','mainCust','Main Cust'),(2,1,'mainMenu','mainOrder','Main Orders'),(3,1,'mainMenu','products','Products'),(4,1,'mainMenu','employee','Employee'),(5,1,'mainMenu','utils','Utilities'),(6,1,'mainMenu','logoff','LogOff'),(7,1,'custMenu','loadlist','Load List'),(8,1,'custMenu','loadticket','Load Ticket'),(9,1,'custMenu','countsich','Count SIC H\'s'),(10,1,'custMenu','loadticketnew','Load Ticket New');
/*!40000 ALTER TABLE `accessList` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `code` varchar(10) DEFAULT NULL,
  `enteredDt` date DEFAULT NULL,
  `enteredBy` varchar(45) DEFAULT NULL,
  `desc` varchar(45) DEFAULT NULL,
  `shipChrgLvl` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `login` varchar(45) DEFAULT NULL,
  `firstName` varchar(45) DEFAULT NULL,
  `lastName` varchar(45) DEFAULT NULL,
  `encryptedPass` varchar(256) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `mobile` int(11) DEFAULT NULL,
  `salt` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (0,'test','test','test','test','test',NULL,NULL),(1,'justin','Justin','Zimmer','l8KwGUasZ6rKQ1wKkqdFXNaAskPiSNuRPXUcgFr1lhMKgsgkx0w9SyAZG2osbfb0pgnKIVK8jwSqsaZTwyhORWyvZEyMRfeVaGz1XKMWT9fivvLXfSIpR7dWgCj7czcMKnTjFIDWf/avjE3zd4kz/9AfdOyNQpKzMkhrCSDFB2s=','jtzimmer6@gmail.com',2147483647,'J+4DBViD4fwfq7hlYmjuXEax6ARi2MmEMqxOUXDFYQKbISgM3JJsZhk2B0pKDLPK4OdjaD+h5sdswwMLNfik9RJNB1BUaTnku0x26nK/fWBoQIKkcraFHz9jlLGIb85ySL9AXmlm1hhXvulHbUqxP1urQ95Mswt4lHkIzSXogx8=');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employee` (
  `id` int(11) NOT NULL,
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2013-10-04 14:48:47
CREATE DATABASE  IF NOT EXISTS `test` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `test`;
-- MySQL dump 10.13  Distrib 5.5.32, for debian-linux-gnu (x86_64)
--
-- Host: 127.0.0.1    Database: test
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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2013-10-04 14:48:47
