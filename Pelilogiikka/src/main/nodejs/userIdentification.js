
module.exports = new function() {

    this.getUserID = function(request) {
        /*
         * TODO 
         * The request could be used to determine hostname, and then
         * access the dhcp leases to check for MAC address.
         *
         * simple guide at EOF
         */

        return Math.floor(Math.random() * 1000000);
    };
};


/* 
 * Pöllitty vissiin stackoverflowsta...
 *
 * You can check your DHCP lease file (in the case of dhcp isc server 
 * /var/lib/dhcp/dhcpd.leases ), the DHCP log, or the Network Manager 
 * log (depending the distribution could be /var/log/syslog, 
 * /var/log/NetworkManager*, etc.).
 *
 * The format of these leases could be in the form of:
 *
 * lease 192.168.42.1 {
 *      starts 0 2000/01/30 08:02:54;
 *      ends 5 2000/02/04 08:02:54;
 *      hardware ethernet
 *      00:50:04:53:D5:57;
 *      uid 01:00:50:04:53:D5:57;
 *      client-hostname "PC0097";
 * }
 *
 */
